create table users(
    id serial primary key, 
    displayName varchar(180),
    picture text,
    username text,
    email varchar(180),
    phone bigint,
    proStatus boolean
);

insert into users( displayName, picture, username, email, phone, proStatus)
values
('Shannon Adair', 'https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/13221541_10209431549966318_8123391277429089316_n.jpg?_nc_cat=0&oh=51caffaa8aa9fbbdddf483133a18787d&oe=5B7F03B7', 'reccosrats9', 'reccosrats9@yahoo.com', 4803325119, true),
('Amber Berhold', 'https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/22309048_10213806647095750_5206565248718821189_n.jpg?_nc_cat=0&oh=134223bed0e6483a8ce78fedb1fb4d23&oe=5B900D9C', 'aberhold', 'aromero14@gmail.com', 4803325119, false),
('Greg McDavitt', 'https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/15242023_10155195845022580_839186402357440738_n.jpg?_nc_cat=0&oh=5973dc5a6848903efdb9fd6cf4255c5d&oe=5B8199B4', 'imthebest', 'gmcd@gmail.com', 4803325119, false);

select * from users;