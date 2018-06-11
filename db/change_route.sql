update routes
set (origin, destination, price, newmatch, textsent, textdate)=($2, $3, $4, false, false, false)
where routeid=$1; 

select * from routes
order by routeid asc;