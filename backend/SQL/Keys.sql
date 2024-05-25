-- Addresses table foreign key
ALTER TABLE Addresses
ADD FOREIGN KEY (userId) REFERENCES Users(id);

-- Users table foreign keys
ALTER TABLE Users
ADD FOREIGN KEY (addressId) REFERENCES Addresses(id),
ADD FOREIGN KEY (ratingId) REFERENCES Ratings(id);

-- SubCategories table foreign key
ALTER TABLE SubCategories
ADD FOREIGN KEY (mainCategoryId) REFERENCES MainCategories(id);

-- Items table foreign keys
ALTER TABLE Items
ADD FOREIGN KEY (sellerId) REFERENCES Users(id),
ADD FOREIGN KEY (mainCategoryId) REFERENCES MainCategories(id),
ADD FOREIGN KEY (subCategoryId) REFERENCES SubCategories(id),
ADD FOREIGN KEY (ratingId) REFERENCES Ratings(id);

-- Orders table foreign key
ALTER TABLE Orders
ADD FOREIGN KEY (userId) REFERENCES Users(id);

-- OrderItems table foreign keys
ALTER TABLE OrderItems
ADD FOREIGN KEY (orderId) REFERENCES Orders(id),
ADD FOREIGN KEY (itemId) REFERENCES Items(id);

-- Cards table foreign key
ALTER TABLE Cards
ADD FOREIGN KEY (userId) REFERENCES Users(id);

-- Cart table foreign key
ALTER TABLE Cart
ADD FOREIGN KEY (userId) REFERENCES Users(id);

-- CartItems table foreign keys
ALTER TABLE CartItems
ADD FOREIGN KEY (cartId) REFERENCES Cart(id),
ADD FOREIGN KEY (itemId) REFERENCES Items(id);

-- Feedback table foreign keys
ALTER TABLE Feedback
ADD FOREIGN KEY (itemId) REFERENCES Items(id),
ADD FOREIGN KEY (userId) REFERENCES Users(id);
