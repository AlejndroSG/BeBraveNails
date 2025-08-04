@echo off
echo ====================================
echo    Be Brave Nails - Development
echo ====================================
echo.

echo Installing Frontend Dependencies...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Backend Dependencies...
cd ..\backend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Development Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo ====================================
echo   Development servers are starting!
echo ====================================
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ====================================
echo.
echo Press any key to exit...
pause > nul
