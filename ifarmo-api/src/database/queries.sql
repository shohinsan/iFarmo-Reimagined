CREATE DATABASE IF NOT EXISTS ifarmo_db;

USE ifarmo_db;

CREATE TABLE IF NOT EXISTS Users
(
    userId      INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    role        VARCHAR(255) NOT NULL DEFAULT 'user',
    email       VARCHAR(255) UNIQUE,
    password    VARCHAR(255) NOT NULL,
    username    VARCHAR(255) NOT NULL UNIQUE,
    createdAt   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    bio         VARCHAR(255),
    contactInfo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Farms
(
    farmId       INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    location     VARCHAR(45)  NOT NULL,
    workingHours VARCHAR(45)           DEFAULT NULL,
    description  VARCHAR(255) NOT NULL DEFAULT 'No description',
    image        VARCHAR(255) NOT NULL DEFAULT '/assets/farm.svg',
    createdAt    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ownerId      INT          NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES Users (userId)
);

CREATE TABLE IF NOT EXISTS Products
(
    productId   INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(60)    NOT NULL,
    type        VARCHAR(45)    NOT NULL,
    description TEXT           NOT NULL,
    quantity    INT            NOT NULL,
    unitType    VARCHAR(45)    NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    city        VARCHAR(45)    NOT NULL,
    image       VARCHAR(255)   NOT NULL DEFAULT '/assets/product.svg',
    createdAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    farmId      INT,
    FOREIGN KEY (farmId) REFERENCES Farms (farmId),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE IF NOT EXISTS Jobs
(
    jobId       INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)   NOT NULL,
    type        VARCHAR(45)    NOT NULL,
    description TEXT           NOT NULL,
    salary      DECIMAL(10, 2) NOT NULL,
    city        VARCHAR(45)    NOT NULL,
    image       VARCHAR(255)   NOT NULL,
    createdAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    farmId      INT,
    FOREIGN KEY (farmId) REFERENCES Farms (farmId),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES Users (userId)
);

# SELECT Products.*, Users.username FROM Products LEFT JOIN Users ON Products.userId;

# LEFT JOIN Users ON Products.userId = Users.userId
# WHERE Products.farmId IN (?);

# ALTER TABLE Products
# ALTER COLUMN image SET DEFAULT '/assets/product.svg';


CREATE TABLE IF NOT EXISTS Equipment
(
    equipmentId INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)   NOT NULL,
    type        VARCHAR(45)    NOT NULL,
    description TEXT           NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    city        VARCHAR(45)    NOT NULL,
    image       VARCHAR(255)   NOT NULL,
    createdAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    farmId      INT,
    FOREIGN KEY (farmId) REFERENCES Farms (farmId),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES Users (userId)
);


CREATE TABLE IF NOT EXISTS Recoveries
(
    recoveryId INT AUTO_INCREMENT PRIMARY KEY,
    userId     INT          NOT NULL,
    token      VARCHAR(255) NOT NULL,
    createdAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE IF NOT EXISTS Tokens
(
    tokenId   INT AUTO_INCREMENT PRIMARY KEY,
    userId    INT          NOT NULL,
    token     VARCHAR(255) NOT NULL,
    createdAt DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users (userId)
);

