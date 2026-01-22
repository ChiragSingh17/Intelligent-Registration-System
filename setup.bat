@echo off
echo ========================================
echo Intelligent Registration System Setup
echo ========================================
echo.

echo [1/3] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

echo [2/3] Installing Playwright browsers...
call npx playwright install
if %errorlevel% neq 0 (
    echo ERROR: Playwright installation failed!
    pause
    exit /b 1
)
echo.

echo [3/3] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Start the web server:
echo    python -m http.server 8000
echo.
echo 2. Run tests:
echo    npm test
echo.
echo 3. View test report:
echo    npm run test:report
echo ========================================
echo.
pause
