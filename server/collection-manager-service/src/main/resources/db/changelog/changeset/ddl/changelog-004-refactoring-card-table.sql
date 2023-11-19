-- Изменение названий столбцов
ALTER TABLE cards
    RENAME COLUMN card_id TO id;

ALTER TABLE cards
    RENAME COLUMN creation_date TO created_at;

ALTER TABLE cards
    RENAME COLUMN modified_date TO updated_at;

-- Переименование существующего индекса
ALTER INDEX index_cards_collection_id
    RENAME TO index_on_collection_id;

-- Добавление комментариев к столбцам
COMMENT ON COLUMN cards.id IS 'Уникальный идентификатор карты';

COMMENT ON COLUMN cards.created_at IS 'Дата и время создания карты';

COMMENT ON COLUMN cards.updated_at IS 'Дата и время последнего обновления карты';

COMMENT ON COLUMN cards.definition IS 'Определение или описание на карте';

COMMENT ON COLUMN cards.hint IS 'Подсказка или дополнительная информация для карты';

COMMENT ON COLUMN cards.image_url IS 'URL изображения, связанного с картой';

COMMENT ON COLUMN cards.term IS 'Термин или ключевое слово, представленное на карте';

COMMENT ON COLUMN cards.collection_id IS 'Идентификатор коллекции, к которой принадлежит карта';

-- Предполагая, что вы уже переименовали индекс
COMMENT ON INDEX index_on_collection_id IS 'Индекс для ускорения поиска карт по идентификатору коллекции';