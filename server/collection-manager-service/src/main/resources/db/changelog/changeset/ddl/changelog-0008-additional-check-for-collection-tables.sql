-- Изменение столбца наименование на VARCHAR с ограничением длины 38 символов
ALTER TABLE collections
ALTER COLUMN name TYPE VARCHAR(38);

-- Изменение столбца описание на VARCHAR с ограничением длины 500 символов
ALTER TABLE collections
ALTER COLUMN description TYPE VARCHAR(500);

ALTER TABLE collections
ALTER COLUMN creator_customer_id TYPE UUID USING creator_customer_id::UUID;
