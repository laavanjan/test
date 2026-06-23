create extension if not exists pgcrypto;

create table if not exists public.admin_import_batches (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('users', 'orders')),
  file_name text not null,
  row_count integer not null default 0,
  imported_count integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id text primary key,
  city text not null default '-',
  created_at timestamptz not null default now(),
  email text not null default '',
  last_order_at timestamptz,
  name text not null default 'Isimsiz Musteri',
  phone text not null default '-',
  rentals integer not null default 0,
  source text not null check (source in ('mock', 'ideasoft', 'paytr')),
  stored_card text not null default 'none' check (stored_card in ('none', 'verified', 'pending')),
  import_batch_id uuid references public.admin_import_batches(id) on delete set null,
  raw jsonb not null default '{}'::jsonb,
  imported_at timestamptz not null default now()
);

create table if not exists public.admin_orders (
  id text primary key,
  amount_kurus integer not null default 0,
  city text not null default '-',
  created_at timestamptz not null default now(),
  customer_email text not null default '',
  customer_name text not null default 'Isimsiz Musteri',
  customer_phone text not null default '-',
  owner_approval text not null default 'not_required' check (owner_approval in ('pending', 'approved', 'rejected', 'not_required')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  platform_order_no text not null,
  product_name text not null default 'IdeaSoft siparis',
  rental_end date,
  rental_start date,
  source text not null check (source in ('mock', 'ideasoft', 'paytr')),
  status text not null default 'IdeaSoft import',
  import_batch_id uuid references public.admin_import_batches(id) on delete set null,
  raw jsonb not null default '{}'::jsonb,
  imported_at timestamptz not null default now()
);

create table if not exists public.admin_order_items (
  id text primary key,
  order_id text not null references public.admin_orders(id) on delete cascade,
  product_name text not null,
  stock_code text not null default '',
  quantity integer,
  quantity_text text not null default '',
  line_total_kurus integer not null default 0,
  source text not null default 'ideasoft',
  import_batch_id uuid references public.admin_import_batches(id) on delete set null,
  raw jsonb not null default '{}'::jsonb,
  imported_at timestamptz not null default now()
);

create unique index if not exists admin_orders_platform_order_no_key
  on public.admin_orders(platform_order_no);

create index if not exists admin_users_email_idx
  on public.admin_users(lower(email));

create index if not exists admin_orders_customer_email_idx
  on public.admin_orders(lower(customer_email));

create index if not exists admin_orders_created_at_idx
  on public.admin_orders(created_at desc);

create index if not exists admin_order_items_order_id_idx
  on public.admin_order_items(order_id);

alter table public.admin_import_batches enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_orders enable row level security;
alter table public.admin_order_items enable row level security;
