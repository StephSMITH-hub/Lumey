@echo off
title Lumey Affiliate Website Live Preview
echo ===============================================================================
echo            LUMEY ENERGY - AFFILIATE WEBSITE LIVE PREVIEW LAUNCHER
echo ===============================================================================
echo.

set PORT=8080
set TARGET_DIR=%~dp0projects

netstat -ano | findstr ":%PORT%" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo [*] Starting local preview server on port %PORT%...
    start "" /b python -m http.server %PORT% --directory "%TARGET_DIR%"
    timeout /t 2 /nobreak >nul
) else (
    echo [*] Server is already running on port %PORT%.
)

echo [*] Opening Lumey Affiliate Website in your default browser...
start "" "http://localhost:%PORT%/affiliate.html"

echo.
echo ===============================================================================
echo  Live URLs:
echo   - Official Affiliate Site: http://localhost:%PORT%/affiliate.html
echo   - Partner Onboarding Hub:  http://localhost:%PORT%/partner_onboarding.html
echo   - Main Consumer Sales Page:http://localhost:%PORT%/index.html
echo   - Distributor Pitch Deck:  http://localhost:%PORT%/Lumey_Executive_Distributor_Pitch_Deck.html
echo ===============================================================================
echo.
pause
