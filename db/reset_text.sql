update routes 
set (textsent, textdate)=(null, null)
where id = $1
returning *;