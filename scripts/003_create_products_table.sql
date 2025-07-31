CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    imageUrl VARCHAR(255),
    link VARCHAR(255),
    type ENUM('main', 'other') NOT NULL DEFAULT 'main'
);
