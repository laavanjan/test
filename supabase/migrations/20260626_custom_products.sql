create table if not exists custom_products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  category    text not null,
  category_slug text not null,
  price       text not null,
  old_price   text,
  min_days    integer not null default 3,
  image       text not null,
  owner       text not null,
  location    text not null,
  description text not null default '',
  badge       text,
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);
