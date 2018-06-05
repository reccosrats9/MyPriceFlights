update routes 
set newmatch=true
where routeid = $1
returning *;