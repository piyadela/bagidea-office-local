@echo off
title Stop BagIdea Office
cd /d "%~dp0"

echo ========================================================
echo   Stopping BagIdea Office Daemon...
echo ========================================================

powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'daemon/server.js' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"

echo.
echo   BagIdea Office Daemon stopped successfully.
echo ========================================================
ping -n 3 127.0.0.1 >nul
