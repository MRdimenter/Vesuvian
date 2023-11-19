-- update_collections_table.sql
ALTER TABLE collections RENAME COLUMN collection_id TO id;
ALTER TABLE collections RENAME COLUMN collection_name TO name;

ALTER INDEX index_collections_collection_id RENAME TO idx_collections_id;
ALTER INDEX index_collections_creator_customer_id RENAME TO idx_collections_creator_customer_id;

