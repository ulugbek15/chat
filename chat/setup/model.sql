create table chat;
create extension "pgcrypto";

create table users(
    user_id serial not null  primary key,
    user_username varchar(32) not null,
    user_password varchar(60) not null,
    user_joinded_at timestamptz default current_timestamp
);

create table rooms(
    room_id serial not null primary key,
    room_name varchar(32)
);

create table participants(
    participants_id serial not null primary key,
    room_id int not null references rooms(room_id),
    user_id int not null references users(user_id)
);

create table messages(
    message_id serial not null primary key,
    message_content text,
    message_time timestamptz  default current_timestamp,
    -- message_delivery boolean default false,
    sender_id int not null references users(user_id),
    recever_id int not null references users(user_id)
);