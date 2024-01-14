-- Изменение столбца наименование на VARCHAR с ограничением длины 15 символов
ALTER TABLE collections.public.tags
ALTER COLUMN name TYPE VARCHAR(15);