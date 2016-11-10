select id,username,userpassword as password
from users
where username = $1
