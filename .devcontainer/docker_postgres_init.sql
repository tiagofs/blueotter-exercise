-- \connect blueotter

-- CREATE TABLE IF NOT EXISTS users (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   password VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   first_name VARCHAR(255),
--   last_name VARCHAR(255),
--   created_at TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
--   deleted_at TIMESTAMP(0) NULL
-- );


-- CREATE TABLE IF NOT EXISTS projects (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   project_name VARCHAR(255)
-- );