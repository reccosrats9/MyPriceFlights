insert into users
(displayName, picture, username)
values 
($1, $2, $3)
returning *