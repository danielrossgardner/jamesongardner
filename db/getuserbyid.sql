SELECT id,username,userpassword as password
FROM users
WHERE id = $1;
