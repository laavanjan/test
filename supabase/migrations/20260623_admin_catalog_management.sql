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

create index if not exists admin_discounts_updated_at_idx
  on public.admin_discounts(updated_at desc);

create index if not exists admin_discounts_target_idx
  on public.admin_discounts(target, target_value);

alter table public.admin_product_overrides enable row level security;
alter table public.admin_category_overrides enable row level security;
alter table public.admin_discounts enable row level security;
alter table public.admin_settings enable row level security;
