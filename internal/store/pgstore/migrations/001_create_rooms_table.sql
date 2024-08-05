create table rooms (
  id uuid primary key not null default gen_random_uuid(),
  theme varchar(255) not null
);
---- create above / drop below ----

drop table rooms;
