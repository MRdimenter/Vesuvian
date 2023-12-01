-- Добавление столбца 'order_number' в таблицу 'cards' с комментарием
ALTER TABLE cards
ADD COLUMN order_number SERIAL;

-- Установка комментария для нового столбца
COMMENT ON COLUMN cards.order_number IS 'Порядковый номер карточки в коллекции';
