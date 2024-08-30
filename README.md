This is a [Next.js](https://nextjs.org) project aimed to showcase the features of next@13 and the react on the server new architecture.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, make sure to add the environment variables for the database and generate the database schema with Prisma:

```bash
echo "DATABASE_URL="file:./dev.db"" >> .env
npx prisma generate
```

Now you can run the development server:

```bash
npm dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Some helpful resources to get started:

[`Rendering`](https://nextjs.org/docs/app/building-your-application/rendering): Server-side rendering, client components, and more.

[`Routing`](https://nextjs.org/docs/app/building-your-application/routing): Learn how to create pages and layouts and navigate between them.

[`SEO`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata): Optimize your application for search engines.

[`Server Actions`](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations): No more API routes and POST requests.

[`RQ Advanced SSR`](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr): Learn how to use React Query with Next.js SSR.
