CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    initials VARCHAR(10),
    text TEXT NOT NULL,
    imageUrl VARCHAR(255)
);
