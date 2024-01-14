-- Изменение столбца термин на VARCHAR с ограничением длины 1000 символов
ALTER TABLE collections.public.cards
ALTER COLUMN term TYPE VARCHAR(1000);

-- Изменение столбца определение на VARCHAR с ограничением длины 1000 символов
ALTER TABLE collections.public.cards
ALTER COLUMN definition TYPE VARCHAR(1000);