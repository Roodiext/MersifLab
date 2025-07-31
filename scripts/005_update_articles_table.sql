-- Add category and date columns to articles table if they don't exist
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS category VARCHAR(255),
ADD COLUMN IF NOT EXISTS date DATE;
-- Update existing articles with default values for new columns
UPDATE articles
SET category = 'Uncategorized', date = CURRENT_DATE
WHERE category IS NULL OR date IS NULL;
-- Ensure the new columns are not nullable
ALTER TABLE articles
ALTER COLUMN category SET NOT NULL,
ALTER COLUMN date SET NOT NULL;
-- Create an index on the category column for faster queries
CREATE INDEX idx_articles_category ON articles(category);
-- Create an index on the date column for faster queries
CREATE INDEX idx_articles_date ON articles(date);
-- Add a foreign key constraint if the articles table references another table
-- (Assuming there is a 'users' table with a 'user_id' column)
ALTER TABLE articles
ADD CONSTRAINT fk_articles_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE;
-- Ensure the foreign key constraint is valid
ALTER TABLE articles
VALIDATE CONSTRAINT fk_articles_user;
-- Add a comment to the articles table for documentation purposes
COMMENT ON TABLE articles IS 'Table containing articles with categories and publication dates';
-- Add comments to the new columns for clarity
COMMENT ON COLUMN articles.category IS 'Category of the article';
COMMENT ON COLUMN articles.date IS 'Publication date of the article';
-- Add a unique constraint on the title column to prevent duplicate titles
ALTER TABLE articles
ADD CONSTRAINT unique_article_title
UNIQUE (title);
-- Ensure the unique constraint is valid
ALTER TABLE articles
VALIDATE CONSTRAINT unique_article_title;
-- Add a check constraint to ensure the date is not in the future
ALTER TABLE articles
ADD CONSTRAINT chk_article_date
CHECK (date <= CURRENT_DATE);
-- Ensure the check constraint is valid
ALTER TABLE articles
VALIDATE CONSTRAINT chk_article_date;
-- Add a trigger to automatically set the date to the current date on insert
CREATE OR REPLACE FUNCTION set_article_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date := CURRENT_DATE;
    RETURN NEW;
END;   
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_set_article_date
BEFORE INSERT ON articles
FOR EACH ROW
EXECUTE FUNCTION set_article_date();
-- Add a trigger to log changes to the articles table
CREATE OR REPLACE FUNCTION log_article_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO article_changes (article_id, change_type, change_time)
    VALUES (NEW.id, TG_OP, CURRENT_TIMESTAMP);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_log_article_changes
AFTER INSERT OR UPDATE OR DELETE ON articles
FOR EACH ROW
EXECUTE FUNCTION log_article_changes();
-- Add a partitioning strategy if the articles table is large
