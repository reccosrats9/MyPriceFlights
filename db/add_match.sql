update routes 
set (newmatch, quotematches)=(true, $2)
where routeid = $1
returning *;