-- Изменение столбца customer_id на тип данных UUID
ALTER TABLE collections.public.customer_collections
ALTER COLUMN customer_id TYPE UUID USING customer_id::UUID;

-- Изменение столбца customer_id на тип данных UUID
ALTER TABLE collections.public.customer_favorite_collections
ALTER COLUMN customer_id TYPE UUID USING customer_id::UUID;
