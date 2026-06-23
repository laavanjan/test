# Varsapp Next Mock

Next.js mock storefront for Varsapp rental flows.

## PayTR Sandbox

PayTR Direct API integration is wired for the rental checkout flow.
The card form posts directly to PayTR, while this app creates the rental order
draft, signs PayTR hidden fields, and receives the callback.

Use the Vercel production URL for PayTR redirects and callback:

```text
App URL: https://varsapp-live.vercel.app
PayTR Bildirim URL: https://varsapp-live.vercel.app/api/paytr/callback
Success URL: https://varsapp-live.vercel.app/odeme/basarili
Fail URL: https://varsapp-live.vercel.app/odeme/basarisiz
```

Required environment variables:

```env
NEXT_PUBLIC_APP_URL=https://varsapp-live.vercel.app
PAYTR_MERCHANT_ID=...
PAYTR_MERCHANT_KEY=...
PAYTR_MERCHANT_SALT=...
PAYTR_TEST_MODE=1
PAYTR_DEBUG_ON=1
PAYTR_ENABLE_CARD_STORAGE=0
```

Important: `/odeme` and `/api/paytr/callback` must be deployed to Vercel before entering the callback URL in the PayTR panel. The callback endpoint confirms notifications by hash and returns plain `OK`, as PayTR expects. The current order store is an in-memory mock repository; replace `src/lib/rental-orders.ts` with a durable database layer before production use.

Set `PAYTR_ENABLE_CARD_STORAGE=1` only after PayTR card storage permission is active for the merchant. When enabled, the checkout includes `store_card=1` and the callback handler is ready to persist PayTR card tokens through the rental order repository.

## Admin Panel

Open `/admin` to view users, rental orders, PayTR callback-created orders, and IdeaSoft imports.

Admin endpoints:

```text
GET  /api/admin/users
GET  /api/admin/orders
POST /api/admin/import
```

`POST /api/admin/import` accepts multipart form data with `kind=users|orders` and `file=<csv-or-json>`. The importer understands common IdeaSoft-style columns such as order number, customer name, email, phone, status, total amount, city, and product names. It stores imported rows in memory for now; use a database before production.

Protect the admin area in production:

```env
ADMIN_BASIC_USER=...
ADMIN_BASIC_PASS=...
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
