# final-team-project-bs

Пустая backend-заготовка командного проекта на Express.

## Запуск

```bash
npm ci
cp .env.example .env
npm run dev
```

Проверка проекта:

```bash
npm run build
npm test
```

## Структура

- `src/controllers` — обработчики запросов;
- `src/routes` — маршруты API;
- `src/models` — Mongoose-модели;
- `src/services` — бизнес-логика;
- `src/middleware` — middleware Express;
- `src/validations` — схемы валидации;
- `src/db` — подключение и конфигурация базы данных;
- `src/utils` — общие утилиты;
- `src/constants` — константы;
- `src/templates` — шаблоны писем;
- `src/routes` — маршруты приложения.
