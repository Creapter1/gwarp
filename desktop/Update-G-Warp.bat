@echo off
title G-Warp Desktop updater
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Update-G-Warp.ps1"
echo.
pause
