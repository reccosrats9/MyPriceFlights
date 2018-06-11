update routes 
set textdate=null
where id = $1
returning *;