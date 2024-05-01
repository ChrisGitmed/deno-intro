import { Context, Hono } from 'hono';
import {
  logger,
  poweredBy,
} from 'hono/middleware';

import { Config } from '../config/index.ts';


const app = new Hono()
  .use('*', logger(), poweredBy())
  .get('/', (context: Context) => context.json({ message: 'Success' }, 200))
  .notFound((context: Context) => context.json({ message: 'Route not found'}, 404))
  .onError((err: Error, context: Context) => {
    console.error(`Server Error: ${err}`);
    return context.json({ message: 'Server Error' }, 500);
  });


Deno.serve({
  port: Config.port,
}, app.fetch);
