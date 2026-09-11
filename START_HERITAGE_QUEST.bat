@echo off
title Heritage Quest Platform
echo ========================================================
echo   HERITAGE QUEST - GAMIFIED CULTURAL PLATFORM
echo ========================================================
echo.
echo Starting Express API Server and SQLite Database...
cd /d "%~dp0"
start "" http://localhost:3000
node server/server.js
pause
