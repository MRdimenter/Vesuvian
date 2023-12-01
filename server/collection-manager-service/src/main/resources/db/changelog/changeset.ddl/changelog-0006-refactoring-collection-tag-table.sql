-- Создание составного индекса для collection_id и tag_id
CREATE INDEX idx_collection_tag_on_collection_and_tag ON collection_tag(collection_id, tag_id);

COMMENT ON TABLE collection_tag IS 'Таблица для связи коллекций и тегов';
COMMENT ON COLUMN collection_tag.id IS 'Уникальный идентификатор связи';
COMMENT ON COLUMN collection_tag.collection_id IS 'Идентификатор коллекции';
COMMENT ON COLUMN collection_tag.tag_id IS 'Идентификатор тега';