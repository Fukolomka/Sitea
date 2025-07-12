@echo off
echo 📦 Создание архива CS2 Case Site...

REM Имя архива с датой
set "ARCHIVE_NAME=cs2-case-site-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%.zip"
set "ARCHIVE_NAME=%ARCHIVE_NAME: =0%"

REM Создаем временную директорию
set "TEMP_DIR=cs2-case-site-package"
mkdir "%TEMP_DIR%" 2>nul

echo 📁 Копирование файлов проекта...

REM Копируем структуру проекта
xcopy /E /I /Q prisma "%TEMP_DIR%\prisma"
xcopy /E /I /Q src "%TEMP_DIR%\src"
xcopy /E /I /Q public "%TEMP_DIR%\public"

REM Копируем конфигурационные файлы
copy package.json "%TEMP_DIR%\" >nul
copy next.config.js "%TEMP_DIR%\" >nul
copy tailwind.config.ts "%TEMP_DIR%\" >nul
copy tsconfig.json "%TEMP_DIR%\" >nul
copy .env.example "%TEMP_DIR%\" >nul
copy .gitignore "%TEMP_DIR%\" >nul

REM Копируем документацию
copy README.md "%TEMP_DIR%\" >nul
copy INSTALLATION.md "%TEMP_DIR%\" >nul
copy GIT_UPLOAD.md "%TEMP_DIR%\" >nul

echo 📦 Создание архива %ARCHIVE_NAME%...

REM Создаем ZIP архив (требует PowerShell)
powershell -Command "Compress-Archive -Path '%TEMP_DIR%\*' -DestinationPath '%ARCHIVE_NAME%' -Force"

REM Удаляем временную директорию
rmdir /S /Q "%TEMP_DIR%"

echo ✅ Архив создан: %ARCHIVE_NAME%
echo.
echo 🚀 Для распаковки используйте:
echo    Щелкните правой кнопкой мыши -> Извлечь все
echo.
echo 📋 Следующие шаги:
echo    1. Распакуйте архив
echo    2. cd cs2-case-site-package
echo    3. npm install
echo    4. Настройте .env файл
echo    5. npx prisma migrate dev --name init
echo    6. npm run db:seed
echo    7. npm run dev

pause