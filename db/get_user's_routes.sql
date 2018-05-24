select *
from users u
join routes r on u.id = r.userID
where u.id= $1
order by r. routeid asc;