.mode list
.separator |
.binary off

.headers off
SELECT COUNT(*) FROM clues;

.headers on
SELECT id, categoryId, level, clue, answer FROM clues;
