-- Run this in your Supabase SQL editor before using the invite feature.

create table public.customer_invitations (
  id uuid not null default gen_random_uuid(),
  inviter_id uuid not null references public.customer_accounts(id) on delete cascade,
  invitee_email text not null,
  status text not null default 'pending'::text,
  message text null,
  sent_at timestamp with time zone not null default now(),
  accepted_at timestamp with time zone null,
  constraint customer_invitations_pkey primary key (id),
  constraint customer_invitations_inviter_invitee_key unique (inviter_id, invitee_email),
  constraint customer_invitations_status_check check (
    status = any (array['pending'::text, 'signed_up'::text])
  )
) tablespace pg_default;

create index if not exists customer_invitations_inviter_id_idx
  on public.customer_invitations using btree (inviter_id) tablespace pg_default;

create index if not exists customer_invitations_invitee_email_idx
  on public.customer_invitations using btree (lower(invitee_email)) tablespace pg_default;
