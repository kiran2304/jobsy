@echo off
echo ==========================================
echo    Jobsy GitHub Publisher Tool
echo ==========================================

:: Check if git is in path
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git not found in PATH. Checking common locations...
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "PATH=%PATH%;C:\Program Files\Git\cmd"
        echo Found Git in Program Files!
    ) else if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd\git.exe" (
        set "PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd"
        echo Found Git in AppData!
    ) else (
        echo [ERROR] Git is not installed or not found.
        echo Please install Git from https://git-scm.com/download/win
        echo After installing, run this script again.
        pause
        exit /b
    )
)

echo.
echo 1. Initializing Git...
git init

echo.
echo 2. Adding files...
git add .

echo.
echo 3. Committing files...
git commit -m "Initial commit of Jobsy App"

echo.
echo 4. Setting branch to 'main'...
git branch -M main

echo.
echo 5. Removing old origin (if exists)...
git remote remove origin 2>nul

echo.
echo 6. adding remote origin...
git remote add origin https://github.com/kiran2304/jobsy.git 2>nul
git remote set-url origin https://github.com/kiran2304/jobsy.git

echo.
echo 7. Pushing to GitHub (Force Overwrite)...
echo (This secures your local code as the main version)
git push -u origin main --force

echo.
echo ==========================================
echo    DONE! Check your repository now.
echo ==========================================
pause
