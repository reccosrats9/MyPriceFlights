create table users(
    id serial primary key, 
    firstName varchar(40),
    lastName varchar(40),
    username varchar(40),
    email varchar(100),
    phone bigint,
    pro boolean
);

insert into users( firstName, lastName, username, email, phone, pro)
values
('Shannon', 'Adair', 'reccosrats9', 'reccosrats9@yahoo.com', 4803325119, true),
('Amber', 'Romero', 'aberhold', 'aromero14@gmail.com', 9678431990, false),
('Greg', 'McDavitt', 'imthebest', 'gmcd@gmail.com', 3325578190, false);

select * from users;