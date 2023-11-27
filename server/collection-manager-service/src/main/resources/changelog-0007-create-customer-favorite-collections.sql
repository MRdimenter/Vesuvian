CREATE SEQUENCE customer_favorite_collection_sequence
    INCREMENT BY 1
    START WITH 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE customer_favorite_collections
(
    id            BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('customer_favorite_collection_sequence'),
    customer_id   VARCHAR(255),
    collection_id BIGINT,
    FOREIGN KEY (collection_id) REFERENCES collections (id)
);

CREATE INDEX idx_customer_favorite_collections_on_customer_and_collection ON customer_favorite_collections(customer_id, collection_id);
