update users 
set (email, phone)=($2, $3)
where id = $1
returning *;