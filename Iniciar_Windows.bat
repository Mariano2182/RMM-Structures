@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
 start "" http://127.0.0.1:8080
 node tools/server.mjs
 goto end
)
where py >nul 2>nul
if %errorlevel%==0 (
 start "" http://127.0.0.1:8080
 py -m http.server 8080 --bind 127.0.0.1
 goto end
)
echo Necesitas Node.js 20 o superior, o Python 3.
echo Tambien podes usar Live Server en VS Code, abriendo index.html.
:end
pause
