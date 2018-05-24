select * from routes
where userID = $1
order by routeid asc;