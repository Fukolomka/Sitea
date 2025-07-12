# 📤 Загрузка CS2 Case Site на GitHub

## 🚀 Быстрая загрузка (если репозиторий уже создан)

```bash
# Переходим в директорию проекта
cd cs2-case-site

# Инициализируем git (если еще не инициализирован)
git init

# Добавляем все файлы
git add .

# Создаем первый коммит
git commit -m "🎮 Initial commit: CS2 Case Opening Site

✅ Features implemented:
- Steam OpenID authentication
- User balance management with top-up modal
- Case opening with weighted random system
- Animated case opening experience
- MySQL database with Prisma ORM
- Admin panel for case/item management
- Responsive UI with TailwindCSS & Radix UI
- TypeScript for type safety

🛠️ Tech Stack:
- Next.js 14 (App Router)
- MySQL + Prisma
- Steam OpenID
- TailwindCSS + Radix UI
- Socket.io ready
- JWT authentication"

# Добавляем удаленный репозиторий (замените на ваш URL)
git remote add origin https://github.com/your-username/cs2-case-site.git

# Загружаем на GitHub
git push -u origin main
```

## 📁 Создание нового репозитория на GitHub

### Вариант 1: Через веб-интерфейс GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Введите название: `cs2-case-site`
4. Добавьте описание: `🎮 CS2 Case Opening Site with Steam Authentication`
5. Сделайте репозиторий публичным или приватным
6. **НЕ** добавляйте README, .gitignore или лицензию (у нас уже есть файлы)
7. Нажмите "Create repository"
8. Скопируйте URL репозитория

### Вариант 2: Через GitHub CLI

```bash
# Установите GitHub CLI (если не установлен)
# macOS: brew install gh
# Windows: winget install --id GitHub.cli

# Авторизуйтесь
gh auth login

# Создайте репозиторий
gh repo create cs2-case-site --public --description "🎮 CS2 Case Opening Site with Steam Authentication"

# Добавьте remote
git remote add origin https://github.com/$(gh api user --jq .login)/cs2-case-site.git
```

## 🗂️ Структура файлов для загрузки

Убедитесь, что у вас есть все файлы:

```
cs2-case-site/
├── 📄 README.md                 # Основная документация
├── 📄 INSTALLATION.md           # Инструкции по установке
├── 📄 GIT_UPLOAD.md            # Эта инструкция
├── 📄 .env.example             # Пример переменных окружения
├── 📄 .gitignore               # Игнорируемые файлы
├── 📄 package.json             # Зависимости проекта
├── 📄 next.config.js           # Конфигурация Next.js
├── 📄 tailwind.config.ts       # Конфигурация Tailwind
├── 📄 tsconfig.json            # Конфигурация TypeScript
├── 📁 prisma/
│   ├── schema.prisma           # Схема базы данных
│   └── seed.ts                 # Тестовые данные
├── 📁 src/
│   ├── 📁 app/                 # Next.js страницы и API
│   ├── 📁 components/          # React компоненты
│   ├── 📁 lib/                 # Утилиты и конфигурация
│   ├── 📁 types/               # TypeScript типы
│   └── middleware.ts           # Middleware для аутентификации
└── 📁 public/                  # Статические файлы
```

## 🔒 Создание .env.example

Создайте файл с примером переменных окружения:

```bash
# Создаем .env.example (без секретных данных)
cat > .env.example << 'EOF'
# Database
DATABASE_URL="mysql://username:password@localhost:3306/cs2_case_site"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Steam OpenID
STEAM_API_KEY="your-steam-api-key"
STEAM_RETURN_URL="http://localhost:3000/api/auth/steam/return"

# JWT
JWT_SECRET="your-jwt-secret-here"

# WebSocket
WEBSOCKET_PORT=3001

# Admin
ADMIN_STEAM_IDS="76561198000000000,76561198000000001"

# File Upload
UPLOAD_DIR="/public/uploads"

# App Settings
APP_NAME="CS2 Case Site"
APP_URL="http://localhost:3000"
EOF
```

## 📝 Создание .gitignore

```bash
# Создаем .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/
.next
out

# Production
/build
dist

# Misc
.DS_Store
*.tsbuildinfo
next-env.d.ts

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# Prisma
prisma/migrations/
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db

# Logs
logs
*.log

# Uploads
public/uploads/
uploads/

# Database
*.db
*.sqlite

# Backup files
*.backup
*.bak
EOF
```

## 🔄 Последующие обновления

После внесения изменений:

```bash
# Проверяем статус
git status

# Добавляем измененные файлы
git add .

# Создаем коммит с описанием изменений
git commit -m "✨ Добавлена новая функция"

# Загружаем изменения
git push origin main
```

## 📋 Примеры полезных коммитов

```bash
# Исправление бага
git commit -m "🐛 Fix Steam authentication redirect issue"

# Новая функция
git commit -m "✨ Add inventory management system"

# Обновление документации
git commit -m "📚 Update installation instructions"

# Улучшение производительности
git commit -m "⚡ Optimize case opening animation"

# Обновление зависимостей
git commit -m "⬆️ Update dependencies to latest versions"

# Стилистические изменения
git commit -m "💄 Improve mobile responsive design"
```

## 🌟 Рекомендации для README на GitHub

Ваш README.md будет отображаться на главной странице репозитория. Убедитесь, что он содержит:

- ✅ Описание проекта
- ✅ Скриншоты или GIF демонстрации
- ✅ Список возможностей
- ✅ Инструкции по установке
- ✅ Технологический стек
- ✅ Лицензию

## 🚀 Автоматическое развертывание

После загрузки на GitHub вы можете настроить автоматическое развертывание:

### Vercel
1. Подключите репозиторий к [Vercel](https://vercel.com)
2. Настройте переменные окружения
3. Проект будет автоматически деплоиться при каждом push

### Netlify
1. Подключите репозиторий к [Netlify](https://netlify.com)
2. Настройте build команды
3. Добавьте переменные окружения

## 🔐 Безопасность

⚠️ **ВАЖНО**: Никогда не загружайте в репозиторий:
- Файл `.env` с реальными ключами
- Steam API ключи
- Пароли от базы данных
- JWT секреты

Используйте переменные окружения в настройках платформы развертывания.

## 📞 Если что-то пошло не так

```bash
# Отменить последний коммит (но сохранить изменения)
git reset --soft HEAD~1

# Принудительно обновить удаленный репозиторий
git push --force origin main

# Проверить удаленные репозитории
git remote -v

# Изменить URL удаленного репозитория
git remote set-url origin https://github.com/new-username/cs2-case-site.git
```

## 🎯 Готово!

После выполнения этих шагов ваш CS2 Case Site будет доступен на GitHub и готов к развертыванию! 🚀