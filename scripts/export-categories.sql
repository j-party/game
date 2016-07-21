.mode list
.separator |
.binary off

.headers off
SELECT COUNT(*) FROM categories;

.headers on
SELECT id, name FROM categories;
