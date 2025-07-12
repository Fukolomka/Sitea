#!/bin/bash

# 🚀 Скрипт для создания архива CS2 Case Site

echo "📦 Создание архива CS2 Case Site..."

# Имя архива с датой
ARCHIVE_NAME="cs2-case-site-$(date +%Y%m%d-%H%M%S).tar.gz"

# Создаем временную директорию
TEMP_DIR="cs2-case-site-package"
mkdir -p "$TEMP_DIR"

echo "📁 Копирование файлов проекта..."

# Копируем структуру проекта
cp -r prisma "$TEMP_DIR/"
cp -r src "$TEMP_DIR/"
cp -r public "$TEMP_DIR/"

# Копируем конфигурационные файлы
cp package.json "$TEMP_DIR/"
cp next.config.js "$TEMP_DIR/"
cp tailwind.config.ts "$TEMP_DIR/"
cp tsconfig.json "$TEMP_DIR/"
cp .env.example "$TEMP_DIR/"
cp .gitignore "$TEMP_DIR/"

# Копируем документацию
cp README.md "$TEMP_DIR/"
cp INSTALLATION.md "$TEMP_DIR/"
cp GIT_UPLOAD.md "$TEMP_DIR/"

# Создаем архив
echo "📦 Создание архива $ARCHIVE_NAME..."
tar -czf "$ARCHIVE_NAME" "$TEMP_DIR"

# Удаляем временную директорию
rm -rf "$TEMP_DIR"

echo "✅ Архив создан: $ARCHIVE_NAME"
echo "📊 Размер архива: $(du -h "$ARCHIVE_NAME" | cut -f1)"
echo ""
echo "🚀 Для распаковки используйте:"
echo "   tar -xzf $ARCHIVE_NAME"
echo ""
echo "📋 Следующие шаги:"
echo "   1. Распакуйте архив"
echo "   2. cd cs2-case-site-package"
echo "   3. npm install"
echo "   4. Настройте .env файл"
echo "   5. npx prisma migrate dev --name init"
echo "   6. npm run db:seed"
echo "   7. npm run dev"