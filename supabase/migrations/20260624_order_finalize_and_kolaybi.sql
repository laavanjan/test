create extension if not exists pgcrypto;

create table if not exists public.admin_product_overrides (
  slug text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_category_overrides (
  slug text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_discounts (
  id text primary key,
  ends_at date,
  is_active boolean not null default true,
  name text not null default 'Yeni indirim',
  starts_at date,
  target text not null default 'all' check (target in ('all', 'category', 'product')),
  target_value text,
  type text not null default 'percentage' check (type in ('percentage', 'fixed')),
  updated_at timestamptz not null default now(),
  value numeric(12, 2) not null default 0
);

create table if not exists public.admin_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.rental_orders
  add column if not exists invoice_status text not null default 'not_requested',
  add column if not exists invoice_error text,
  add column if not exists kolaybi_invoice_id text,
  add column if not exists kolaybi_invoice jsonb not null default '{}'::jsonb;

create table if not exists public.rental_order_items (
  id text primary key,
  created_at timestamptz not null default now(),
  days integer not null default 0,
  end_date date not null,
  line_index integer not null default 0,
  merchant_oid text not null references public.rental_orders(merchant_oid) on delete cascade,
  product jsonb not null default '{}'::jsonb,
  product_name text not null default '',
  product_sku text not null default '',
  product_slug text not null default '',
  quantity numeric(12, 2) not null default 1,
  start_date date not null,
  subtotal_kurus integer not null default 0,
  total_kurus integer not null default 0,
  unit_price_kurus integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (merchant_oid, line_index)
);

create table if not exists public.rental_bookings (
  id text primary key,
  created_at timestamptz not null default now(),
  customer_email text not null default '',
  customer_name text not null default '',
  customer_phone text not null default '',
  end_date date not null,
  line_item_id text references public.rental_order_items(id) on delete set null,
  merchant_oid text not null references public.rental_orders(merchant_oid) on delete cascade,
  product_name text not null default '',
  product_sku text not null default '',
  product_slug text not null default '',
  start_date date not null,
  status text not null default 'active' check (status in ('active', 'cancelled', 'completed')),
  updated_at timestamptz not null default now()
);

create index if not exists admin_discounts_updated_at_idx
  on public.admin_discounts(updated_at desc);

create index if not exists admin_discounts_target_idx
  on public.admin_discounts(target, target_value);

create index if not exists rental_order_items_merchant_oid_idx
  on public.rental_order_items(merchant_oid);

create index if not exists rental_bookings_merchant_oid_idx
  on public.rental_bookings(merchant_oid);

create index if not exists rental_bookings_product_dates_idx
  on public.rental_bookings(product_slug, start_date, end_date)
  where status = 'active';

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'admin_orders'
  ) then
    alter table public.admin_orders
      add column if not exists invoice_status text not null default 'not_requested',
      add column if not exists invoice_reference text,
      add column if not exists raw_metadata jsonb not null default '{}'::jsonb;
  end if;
end $$;

alter table public.admin_product_overrides enable row level security;
alter table public.admin_category_overrides enable row level security;
alter table public.admin_discounts enable row level security;
alter table public.admin_settings enable row level security;
alter table public.rental_order_items enable row level security;
alter table public.rental_bookings enable row level security;
