@echo off
title Lumey Sync Chat History to GitHub
echo =================================================================
echo  LUMEY CHAT HISTORY & PROGRESS LOG GITHUB SYNC
echo =================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync_chat_history.ps1"
echo.
echo =================================================================
echo Process finished. Press any key to close this window.
pause >nul
