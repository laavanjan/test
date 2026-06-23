create extension if not exists pgcrypto;

create table if not exists public.customer_accounts (
  id uuid primary key default gen_random_uuid(),
  admin_user_id text references public.admin_users(id) on delete set null,
  city text not null default '-',
  created_at timestamptz not null default now(),
  email text not null unique,
  last_login_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  name text not null default 'Isimsiz Musteri',
  password_hash text,
  password_salt text,
  phone text not null default '-',
  source text not null default 'ideasoft' check (source in ('ideasoft', 'self_signup', 'paytr', 'manual')),
  status text not null default 'imported' check (status in ('imported', 'active', 'disabled')),
  updated_at timestamptz not null default now()
);

create table if not exists public.customer_sessions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.customer_accounts(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(),
  token_hash text not null unique
);

create table if not exists public.rental_orders (
  merchant_oid text primary key,
  callback_received_at timestamptz,
  card_storage jsonb not null default '{}'::jsonb,
  card_storage_requested boolean not null default false,
  created_at timestamptz not null default now(),
  customer jsonb not null default '{}'::jsonb,
  customer_account_id uuid references public.customer_accounts(id) on delete set null,
  days integer not null default 0,
  end_date date not null,
  owner_approval text not null default 'pending' check (owner_approval in ('pending', 'approved', 'rejected', 'not_required')),
  paytr jsonb not null default '{}'::jsonb,
  product jsonb not null default '{}'::jsonb,
  shipping_kurus integer not null default 0,
  start_date date not null,
  status text not null default 'payment_pending',
  subtotal_kurus integer not null default 0,
  total_kurus integer not null default 0,
  unit_price_kurus integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_callbacks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  merchant_oid text not null,
  raw jsonb not null default '{}'::jsonb,
  status text not null check (status in ('success', 'failed')),
  total_amount text not null
);

create index if not exists customer_accounts_email_idx
  on public.customer_accounts(lower(email));

create index if not exists customer_sessions_account_id_idx
  on public.customer_sessions(account_id);

create index if not exists customer_sessions_expires_at_idx
  on public.customer_sessions(expires_at);

create index if not exists rental_orders_created_at_idx
  on public.rental_orders(created_at desc);

create index if not exists payment_callbacks_merchant_oid_idx
  on public.payment_callbacks(merchant_oid);

insert into public.customer_accounts (
  admin_user_id,
  city,
  created_at,
  email,
  name,
  phone,
  source,
  status,
  updated_at
)
select
  user_row.id,
  user_row.city,
  user_row.created_at,
  lower(user_row.email),
  user_row.name,
  user_row.phone,
  'ideasoft',
  'imported',
  now()
from public.admin_users user_row
where user_row.source = 'ideasoft'
  and user_row.email <> ''
  and user_row.email <> '-'
on conflict (email) do update set
  admin_user_id = excluded.admin_user_id,
  city = excluded.city,
  name = excluded.name,
  phone = excluded.phone,
  updated_at = now();

alter table public.customer_accounts enable row level security;
alter table public.customer_sessions enable row level security;
alter table public.rental_orders enable row level security;
alter table public.payment_callbacks enable row level security;
