create or replace view public.admin_dashboard_metrics as
select
  (select count(*) from public.admin_users)::bigint as users,
  (select count(*) from public.admin_orders)::bigint as orders,
  (select count(*) from public.admin_orders where source = 'ideasoft')::bigint as imported_orders,
  (select count(*) from public.admin_orders where owner_approval = 'pending')::bigint as pending_owner_approval,
  (select count(*) from public.admin_orders where payment_status = 'failed')::bigint as failed_payments,
  (select coalesce(sum(amount_kurus), 0) from public.admin_orders where payment_status = 'paid')::bigint as revenue_kurus;
