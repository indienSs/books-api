create table users(
    id serial primary key,
    user_name text,
    user_role integer,
    password_hash text
);

create table books(
    id serial primary key,
    title text,
    author text,
    publication_date date,
    genres text[]
);