CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       name VARCHAR(255) NOT NULL,
                       phone VARCHAR(20) NOT NULL,
                       address TEXT NOT NULL,
                       password VARCHAR(120) NOT NULL
);
