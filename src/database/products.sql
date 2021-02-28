CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT
  , code char(128)
  , name char(128)
  , video char(128)
  , text TEXT
  , price REAL
  , active INTEGER
  , category char(128)
);