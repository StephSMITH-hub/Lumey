@echo off
title Lumey Auto-Sync to GitHub
echo =================================================================
echo  LUMEY AUTOMATIC GITHUB PROGRESS SYNC
echo =================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync_progress.ps1"
echo.
echo =================================================================
echo Process finished. Press any key to close this window.
pause >nul
