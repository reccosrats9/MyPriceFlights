create table quotes(
    id serial primary key,
    routeid integer references users(id),
    
)