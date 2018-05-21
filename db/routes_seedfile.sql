create table routes (
    routeID serial primary key,
    userID integer references users(id),
    origin varchar(40),
    destination varchar(40),
    price decimal
);

insert into routes (userID, origin, destination, price)
values
(1, 'SLC', 'CDG', 400),
(1, 'SLC', 'NBO', 800),
(1, 'SLC', 'LIM', 200),
(2, 'SLC', 'SYD', 800),
(2, 'LAX', 'AKL', 1000),
(2, 'SLC', 'BZE', 450),
(3, 'IAD', 'NBO', 800),
(3, 'DCA', 'NBO', 800),
(3, 'DCA', 'LHR', 400);

select * from routes;
