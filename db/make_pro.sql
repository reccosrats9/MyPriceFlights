update users 
set prostatus= true
where id = $1
returning *;