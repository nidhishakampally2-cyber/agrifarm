@echo off
echo 🚀 AgriFarm Deployment Helper
echo ================================
echo.
echo Choose your deployment option:
echo.
echo 1. Netlify (Easiest - Free)
echo 2. Vercel (Developer-friendly - Free)
echo 3. GitHub Pages (Free with GitHub account)
echo 4. Manual deployment instructions
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto github
if "%choice%"=="4" goto manual
goto end

:netlify
echo.
echo 🌐 Netlify Deployment Instructions:
echo ====================================
echo.
echo 1. Go to https://netlify.com
echo 2. Sign up for a free account
echo 3. Click "Add new site" → "Deploy manually"
echo 4. Drag and drop your entire 'agrifarm' folder
echo 5. Wait for deployment to complete
echo 6. Get your permanent link!
echo.
echo Your permanent links will be:
echo - Launcher: https://your-app-name.netlify.app/launcher.html
echo - Web App: https://your-app-name.netlify.app/index.html
echo - Mobile App: https://your-app-name.netlify.app/index.html (installable)
echo - Login: https://your-app-name.netlify.app/login.html
echo.
pause
goto end

:vercel
echo.
echo ⚡ Vercel Deployment Instructions:
echo ===================================
echo.
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Run: vercel
echo 3. Follow the prompts
echo 4. Get your permanent link!
echo.
echo Your permanent links will be:
echo - Launcher: https://agrifarm.vercel.app/launcher.html
echo - Web App: https://agrifarm.vercel.app/index.html
echo - Mobile App: https://agrifarm.vercel.app/index.html (installable)
echo - Login: https://agrifarm.vercel.app/login.html
echo.
pause
goto end

:github
echo.
echo 📚 GitHub Pages Deployment Instructions:
echo =========================================
echo.
echo 1. Create a GitHub repository
echo 2. Upload all your agrifarm files
echo 3. Go to Settings → Pages
echo 4. Select source: Deploy from a branch
echo 5. Select branch: main
echo 6. Get your permanent link!
echo.
echo Your permanent links will be:
echo - Launcher: https://yourusername.github.io/agrifarm/launcher.html
echo - Web App: https://yourusername.github.io/agrifarm/index.html
echo - Mobile App: https://yourusername.github.io/agrifarm/index.html (installable)
echo - Login: https://yourusername.github.io/agrifarm/login.html
echo.
pause
goto end

:manual
echo.
echo 📋 Manual Deployment Instructions:
echo ===================================
echo.
echo For permanent links, you need to deploy to a web server.
echo.
echo Free options:
echo - Netlify: https://netlify.com (Easiest)
echo - Vercel: https://vercel.com (Developer-friendly)
echo - GitHub Pages: https://pages.github.com (Free with GitHub)
echo.
echo Paid options:
echo - AWS S3: https://aws.amazon.com/s3
echo - DigitalOcean: https://digitalocean.com
echo - Heroku: https://heroku.com
echo.
echo All options provide HTTPS (required for mobile app).
echo.
pause
goto end

:end
echo.
echo 🌾 AgriFarm Deployment Helper Complete!
echo.
echo Current local links (temporary):
echo - Launcher: http://localhost:8000/launcher.html
echo - Web App: http://localhost:8000/index.html
echo - Mobile App: http://localhost:8000/index.html (installable)
echo - Login: http://localhost:8000/login.html
echo.
echo For permanent links, follow the deployment instructions above.
echo.
pause
