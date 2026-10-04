# ==============================================================================
# LUMEY / CHAT HISTORY & PROGRESS LOG GITHUB SYNC ENGINE
# ==============================================================================
# Automatically parses the current/latest conversation transcript from the IDE brain,
# creates/updates a human-readable CHAT_AND_SESSION_LOG.md in the repository,
# displays recent conversation turns on the console, and syncs everything directly to GitHub.
#
# Usage:
#   .\sync_chat_history.ps1
# ==============================================================================

$ScriptDir = $PSScriptRoot
if (-not $ScriptDir) { $ScriptDir = Get-Location }
Set-Location $ScriptDir

$CjsScript = Join-Path $ScriptDir "sync_chat_history.cjs"
if (Test-Path $CjsScript) {
    node "$CjsScript"
} else {
    Write-Host "[ERROR] sync_chat_history.cjs not found in $ScriptDir" -ForegroundColor Red
}
