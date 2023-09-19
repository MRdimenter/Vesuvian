--liquibase formatted sql
--changeset Dmitriy Galtsev:init-database

-- Создание таблицы "tags"
CREATE TABLE tags
(
    tag_id   BIGINT NOT NULL PRIMARY KEY, -- Уникальный идентификатор тега
    tag_name VARCHAR(255)                 -- Название тега
);

CREATE SEQUENCE tags_sequence START WITH 1 INCREMENT BY 1;


-- Создание таблицы "collections"
CREATE TABLE collections
(
    collection_id       BIGINT       NOT NULL PRIMARY KEY, -- Уникальный идентификатор коллекции
    collection_name     TEXT         NOT NULL,             -- Название коллекции
    creation_date       TIMESTAMP(6) NOT NULL,             -- Дата создания коллекции
    creator_customer_id TEXT         NOT NULL,             -- Идентификатор создателя коллекции
    description         TEXT,                              -- Описание коллекции
    is_public           BOOLEAN,                           -- Флаг публичности коллекции
    modified_date       TIMESTAMP(6),                      -- Дата последнего изменения коллекции
    number_of_cards     INTEGER,                           -- Количество карт в коллекции
    rating              DOUBLE PRECISION                   -- Рейтинг коллекции
);

CREATE SEQUENCE collection_sequence START WITH 1 INCREMENT BY 1;

CREATE INDEX index_collections_collection_id
    ON collections (collection_id);

CREATE INDEX index_collections_creator_customer_id
    ON collections (creator_customer_id);


-- Создание таблицы "cards"
CREATE TABLE cards
(
    card_id       BIGINT       NOT NULL PRIMARY KEY, -- Уникальный идентификатор карты
    creation_date TIMESTAMP(6) NOT NULL,             -- Дата создания карты
    definition    VARCHAR(255) NOT NULL,             -- Определение карты
    hint          VARCHAR(255),                      -- Подсказка к карте
    image_url     VARCHAR(255),                      -- URL изображения
    modified_date TIMESTAMP(6),                      -- Дата последнего изменения карты
    term          VARCHAR(255) NOT NULL,             -- Термин на карте
    collection_id BIGINT       NOT NULL,             -- Идентификатор коллекции, к которой принадлежит карта
    CONSTRAINT fk_collection_id
        FOREIGN KEY (collection_id)
            REFERENCES collections (collection_id)
);

CREATE SEQUENCE card_sequence START WITH 1 INCREMENT BY 1;

CREATE INDEX index_cards_collection_id
    ON cards (collection_id);

-- Создание таблицы "customer_collections"
CREATE TABLE customer_collections
(
    collection_id BIGINT       NOT NULL, -- Идентификатор коллекции
    customer_id   VARCHAR(255) NOT NULL, -- Идентификатор клиента
    PRIMARY KEY (collection_id, customer_id),
    CONSTRAINT fk_collection_id
        FOREIGN KEY (collection_id)
            REFERENCES collections (collection_id)
);

CREATE INDEX index_customer_id
    ON customer_collections (customer_id);

CREATE INDEX index_collection_id
    ON customer_collections (collection_id);

-- Создание таблицы "collection_tag"
CREATE TABLE collection_tag
(
    id            BIGSERIAL PRIMARY KEY, -- Уникальный идентификатор связи
    collection_id BIGINT NOT NULL,       -- Идентификатор коллекции
    tag_id        BIGINT NOT NULL,       -- Идентификатор тега
    CONSTRAINT fk_collection_id
        FOREIGN KEY (collection_id)
            REFERENCES collections (collection_id),
    CONSTRAINT fk_tag_id
        FOREIGN KEY (tag_id)
            REFERENCES tags (tag_id)
);