
-- изменение наименований столбцов таблицы
ALTER TABLE tags RENAME COLUMN tag_id TO id;
ALTER TABLE tags RENAME COLUMN tag_name TO name;

-- Изменение типа данных для tag_id
ALTER TABLE tags ALTER COLUMN id TYPE INT;

-- Добавление NOT NULL ограничения для tag_name
ALTER TABLE tags ALTER COLUMN name SET NOT NULL;

-- Добавление индекса на tag_name
CREATE INDEX idx_tag_name ON tags (name);

-- Добавление комментариев
COMMENT ON TABLE tags IS 'Таблица для хранения тегов. Каждый тег имеет уникальный ID и имя.';
COMMENT ON COLUMN tags.id IS 'Уникальный идентификатор тега. Используется для связи с другими таблицами.';
COMMENT ON COLUMN tags.name IS 'Название тега. Отражает суть или категорию, связанную с тегом.';
