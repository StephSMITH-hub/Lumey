# ==============================================================================
# LUMEY / GIT AUTO-SYNC PROGRESS ENGINE
# ==============================================================================
# Automatically stages, commits, and pushes all local progress directly to GitHub.
#
# Usage:
#   .\sync_progress.ps1                   (Runs a one-time automatic sync)
#   .\sync_progress.ps1 -Message "my msg" (Syncs with a custom commit message)
#   .\sync_progress.ps1 -Watch            (Continuously watches and auto-syncs)
#   .\sync_progress.ps1 -Watch -Interval 30 (Watches every 30 seconds)
# ==============================================================================

param (
    [string]$Message = "",
    [switch]$Watch,
    [int]$Interval = 60
)

# Set execution directory to the script's root folder
$RepoRoot = $PSScriptRoot
if (-not $RepoRoot) { $RepoRoot = Get-Location }
Set-Location $RepoRoot

function Sync-GitProgress {
    param ([string]$CustomMessage)

    $timeStamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timeStamp] Checking repository status..." -ForegroundColor Cyan

    # Check if this is a valid Git repository
    $isGit = git rev-parse --is-inside-work-tree 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Current directory is not a Git repository: $RepoRoot" -ForegroundColor Red
        return $false
    }

    # Detect current branch
    $currentBranch = (git branch --show-current).Trim()
    if (-not $currentBranch) {
        $currentBranch = "main"
    }

    # Check for changes
    $statusOutput = git status --porcelain
    if (-not $statusOutput) {
        # Check if ahead of remote
        $aheadCount = (git rev-list --count "@{u}..HEAD" 2>$null)
        if ($aheadCount -and [int]$aheadCount -gt 0) {
            Write-Host "No uncommitted files, but local branch is ahead by $aheadCount commit(s). Pushing to GitHub..." -ForegroundColor Yellow
            git push origin $currentBranch
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[SUCCESS] Pushed pending commits to GitHub (origin/$currentBranch)!" -ForegroundColor Green
            } else {
                Write-Host "[ERROR] Failed to push to GitHub. Check connection or credentials." -ForegroundColor Red
            }
        } else {
            Write-Host "Everything is clean and up to date with GitHub." -ForegroundColor Green
        }
        return $true
    }

    # Analyze changes
    $statusLines = $statusOutput -split "`r?`n" | Where-Object { $_ -ne "" }
    $changeCount = $statusLines.Count
    $sampleFiles = @()
    foreach ($line in ($statusLines | Select-Object -First 3)) {
        $sampleFiles += $line.Substring(3).Trim()
    }
    $fileSummary = $sampleFiles -join ", "
    if ($changeCount -gt 3) {
        $fileSummary += " (and $($changeCount - 3) more)"
    }

    Write-Host "Detected $changeCount modified/new file(s): $fileSummary" -ForegroundColor Yellow

    # Stage all changes
    Write-Host "Staging files..." -ForegroundColor Gray
    git add -A
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to stage files." -ForegroundColor Red
        return $false
    }

    # Determine commit message
    if ($CustomMessage) {
        $commitMessage = $CustomMessage
    } else {
        $commitMessage = "feat: auto-sync progress [$timeStamp] ($changeCount files: $fileSummary)"
    }

    # Commit
    Write-Host "Committing: $commitMessage" -ForegroundColor Gray
    git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Git commit failed." -ForegroundColor Red
        return $false
    }

    # Push to remote
    Write-Host "Pushing to GitHub (origin/$currentBranch)..." -ForegroundColor Cyan
    git push origin $currentBranch
    if ($LASTEXITCODE -eq 0) {
        Write-Host "=================================================================" -ForegroundColor Green
        Write-Host " [SUCCESS] Synced $changeCount file(s) directly to GitHub!" -ForegroundColor Green
        Write-Host " Branch: $currentBranch | Timestamp: $timeStamp" -ForegroundColor Green
        Write-Host "=================================================================" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[ERROR] Git push failed. Please check network connection or remote credentials." -ForegroundColor Red
        return $false
    }
}

# Execution Mode
Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host " LUMEY AUTO-SYNC TO GITHUB " -ForegroundColor Yellow
Write-Host " Working Directory: $RepoRoot" -ForegroundColor Gray
Write-Host "=================================================================" -ForegroundColor Yellow

if ($Watch) {
    Write-Host "Running in WATCH mode (checking every $Interval seconds)..." -ForegroundColor Cyan
    Write-Host "Press Ctrl + C to stop watching." -ForegroundColor Gray
    Write-Host ""
    while ($true) {
        Sync-GitProgress -CustomMessage $Message
        Start-Sleep -Seconds $Interval
    }
} else {
    Sync-GitProgress -CustomMessage $Message
}
