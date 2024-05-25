CREATE TABLE SubCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mainCategoryId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mainCategoryId) REFERENCES MainCategories(id)
);

