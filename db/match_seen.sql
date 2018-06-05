update routes 
set newmatch=false
where routeid = $1
returning *;