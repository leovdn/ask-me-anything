-- name: GetRoom :one
SELECT
  "id", "theme"
FROM rooms
WHERE "theme" = $1;