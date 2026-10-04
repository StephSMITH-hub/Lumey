@echo off
title Lumey Pull Updates from GitHub
echo =================================================================
echo  LUMEY PULL REPOSITORY UPDATES FROM GITHUB
echo =================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0pull_repo.ps1"
echo.
echo =================================================================
echo Process finished. Press any key to close this window.
pause >nul
