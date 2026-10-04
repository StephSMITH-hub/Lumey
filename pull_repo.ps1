# ==============================================================================
# LUMEY / GIT REPOSITORY PULL & SYNC ENGINE
# ==============================================================================
# Safely pulls all latest updates from the GitHub repository into the local workspace.
# Protects any uncommitted work with automatic stashing, and displays a summary of new changes.
#
# Usage:
#   .\pull_repo.ps1             (Pulls latest changes for current branch)
#   .\pull_repo.ps1 -All        (Fetches and pulls all branches/tags)
# ==============================================================================

param (
    [switch]$All
)

$RepoRoot = $PSScriptRoot
if (-not $RepoRoot) { $RepoRoot = Get-Location }
Set-Location $RepoRoot

Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host " LUMEY GITHUB REPOSITORY PULL ENGINE " -ForegroundColor Yellow
Write-Host " Directory: $RepoRoot" -ForegroundColor Gray
Write-Host " Time:      $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host ""

# Check if valid Git repo
$isGit = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Current directory is not a valid Git repository: $RepoRoot" -ForegroundColor Red
    exit 1
}

# Get current branch and remote
$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) { $currentBranch = "main" }
$remoteName = "origin"

Write-Host "Target Remote: $remoteName" -ForegroundColor Cyan
Write-Host "Active Branch: $currentBranch" -ForegroundColor Cyan
Write-Host ""

# Check for uncommitted local changes
$statusOutput = git status --porcelain
$stashed = $false

if ($statusOutput) {
    Write-Host "[NOTICE] Uncommitted local modifications detected. Automatically stashing to protect your work..." -ForegroundColor Yellow
    git stash push -m "Auto-stash before pull [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
    if ($LASTEXITCODE -eq 0) {
        $stashed = $true
        Write-Host "Local changes temporarily stashed safely." -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Could not stash local changes. Proceeding with standard pull..." -ForegroundColor Yellow
    }
}

# Fetch remote
Write-Host "Fetching updates from GitHub..." -ForegroundColor Gray
if ($All) {
    git fetch --all --prune --tags
} else {
    git fetch $remoteName $currentBranch
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to connect to GitHub remote. Please check your internet connection." -ForegroundColor Red
    if ($stashed) { git stash pop }
    exit 1
}

# Compare local HEAD with remote
$remoteRef = "$remoteName/$currentBranch"
$behindCount = (git rev-list --count "HEAD..$remoteRef" 2>$null)
$aheadCount = (git rev-list --count "$remoteRef..HEAD" 2>$null)

Write-Host "Local branch status vs ${remoteRef}:" -ForegroundColor Gray
Write-Host "  Commits Behind: $behindCount" -ForegroundColor $(if ([int]$behindCount -gt 0) { "Yellow" } else { "Green" })
Write-Host "  Commits Ahead:  $aheadCount" -ForegroundColor $(if ([int]$aheadCount -gt 0) { "Cyan" } else { "Green" })
Write-Host ""

if ([int]$behindCount -gt 0) {
    Write-Host "Incoming commits from GitHub:" -ForegroundColor Yellow
    git log --oneline -n [math]::Min(5, [int]$behindCount) "HEAD..$remoteRef" | ForEach-Object {
        Write-Host "  + $_" -ForegroundColor Green
    }
    Write-Host ""
}

# Execute Pull
Write-Host "Applying updates from ${remoteRef}..." -ForegroundColor Cyan
git pull --rebase $remoteName $currentBranch

if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Rebase pull encountered a notice, attempting standard merge pull..." -ForegroundColor Yellow
    git rebase --abort 2>$null
    git pull $remoteName $currentBranch
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=================================================================" -ForegroundColor Green
    Write-Host " [SUCCESS] Successfully pulled all updates from GitHub!" -ForegroundColor Green
    $latestCommit = (git log -1 --pretty=format:"%h - %s (%cr)" 2>$null)
    Write-Host " Latest Commit on ${currentBranch}: $latestCommit" -ForegroundColor Green
    Write-Host "=================================================================" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to pull updates cleanly. Check for conflicts." -ForegroundColor Red
}

# Restore Stash if applied
if ($stashed) {
    Write-Host ""
    Write-Host "Restoring your stashed local work..." -ForegroundColor Cyan
    git stash pop
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Your local working changes have been restored cleanly." -ForegroundColor Green
    } else {
        Write-Host "[NOTICE] Stash restored with conflict markers. Please review modified files." -ForegroundColor Yellow
    }
}
