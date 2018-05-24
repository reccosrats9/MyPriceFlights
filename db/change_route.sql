update routes
set (origin, destination, price)=($2, $3, $4)
where routeid=$1; 

select * from routes
order by routeid asc;