@echo off
echo ========================================
echo Running Registration System Tests
echo ========================================
echo.

echo Starting tests...
call npm test

echo.
echo ========================================
echo Tests completed!
echo ========================================
echo.
echo Check the following for results:
echo - Screenshots: error-state.png, success-state.png
echo - Test Report: npm run test:report
echo - Test Results: test-results/ directory
echo.
pause
