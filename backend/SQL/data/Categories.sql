INSERT INTO main_categories (name) VALUES
('Electronics'),
('Clothing'),
('Home & Kitchen'),
('Books'),
('Toys & Games');

INSERT INTO sub_categories (main_category_id, image_url, name) VALUES
((SELECT id FROM main_categories WHERE name = 'Electronics'), 'https://asset.cloudinary.com/dl7atizzb/52cb9b7af6743dd3dc8e099f76eac866', 'Mobile Phones'),
((SELECT id FROM main_categories WHERE name = 'Electronics'), '', 'Laptops'),
((SELECT id FROM main_categories WHERE name = 'Electronics'), '', 'Cameras'),
((SELECT id FROM main_categories WHERE name = 'Electronics'), 'http://example.com/electronics/tv.png', 'Televisions'),
((SELECT id FROM main_categories WHERE name = 'Clothing'), 'http://example.com/clothing/men.png', 'Men\'s Clothing'),
((SELECT id FROM main_categories WHERE name = 'Clothing'), 'http://example.com/clothing/women.png', 'Women\'s Clothing'),
((SELECT id FROM main_categories WHERE name = 'Clothing'), 'http://example.com/clothing/kids.png', 'Kids\' Clothing'),
((SELECT id FROM main_categories WHERE name = 'Home & Kitchen'), 'https://asset.cloudinary.com/dl7atizzb/2935f6fe8986ed94e35c6f46ce0e7547', 'Kitchen Appliances'),
((SELECT id FROM main_categories WHERE name = 'Home & Kitchen'), 'http://example.com/home/decor.png', 'Home Decor'),
((SELECT id FROM main_categories WHERE name = 'Home & Kitchen'), 'http://example.com/home/furniture.png', 'Furniture'),
((SELECT id FROM main_categories WHERE name = 'Books'), 'https://asset.cloudinary.com/dl7atizzb/04c72b47638d9708b6ce69f8dbf3cbd4', 'Fiction'),
((SELECT id FROM main_categories WHERE name = 'Books'), 'http://example.com/books/nonfiction.png', 'Education'),
((SELECT id FROM main_categories WHERE name = 'Books'), 'https://asset.cloudinary.com/dl7atizzb/4a8416429dea28d206fa3f1cad110e23', 'Children\'s Books'),
((SELECT id FROM main_categories WHERE name = 'Toys & Games'), 'http://example.com/toys/boardgames.png', 'Board Games'),
((SELECT id FROM main_categories WHERE name = 'Toys & Games'), 'http://example.com/toys/puzzles.png', 'Puzzles'),
((SELECT id FROM main_categories WHERE name = 'Toys & Games'), 'http://example.com/toys/outdoor.png', 'Outdoor Toys');