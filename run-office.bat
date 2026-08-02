@echo off
title BagIdea Office Launcher
cd /d "%~dp0"

echo ========================================================
echo   BAG IDEA Office - Starting System Daemon...
echo ========================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

echo [1/2] Opening BagIdea Office Web UI in browser...
start http://127.0.0.1:8787

echo [2/2] Running BagIdea Office Daemon on http://127.0.0.1:8787 ...
echo (Keep this window open while using BagIdea Office)
echo.
node daemon/server.js
