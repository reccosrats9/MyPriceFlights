select *
from users u
join routes r on u.id = r.userID
order by r. routeid asc;