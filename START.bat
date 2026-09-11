@echo off
title Heritage Quest Platform - React + Vite + Three.js
echo ========================================================
echo   HERITAGE QUEST - GAMIFIED CULTURAL PLATFORM
echo ========================================================
echo.
echo Starting Vite Frontend on http://localhost:5173...
cd /d "%~dp0"
start "" http://localhost:5173
npm run dev
pause
