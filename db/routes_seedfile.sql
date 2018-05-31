create table routes (
    routeID serial primary key,
    userID integer references users(id),
    origin varchar(40),
    destination varchar(40),
    price decimal,
    newMatch boolean
);

insert into routes (userID, origin, destination, price, newMatch)
values
(1, 'SLC', 'CDG', 400, false),
(1, 'SLC', 'NBO', 800, false),
(1, 'SLC', 'LIM', 200, false),
(2, 'SLC', 'SYD', 800, false),
(2, 'LAX', 'AKL', 1000, false),
(2, 'SLC', 'BZE', 450, false),
(3, 'IAD', 'NBO', 800, false),
(3, 'DCA', 'NBO', 800, false),
(3, 'DCA', 'LHR', 400, false);

select * from routes;
