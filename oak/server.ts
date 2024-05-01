import {
  Application,
  Context,
  Next,
  Router,
  isHttpError,
} from 'jsr:@oak/oak';

import { Config } from '../config/index.ts';



// Middleware
const errorMiddleware = async (context: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.log(err)
    context.response.status = isHttpError(err) ? err.status : 500;
    context.response.body = { error: err.message };
    context.response.type = 'json';
  }
}

const loggingMiddleware = async (context: Context, next: Next) => {
  const startTime = Date.now();
  await next();
  const { request, response } = context;
  const elapsedMilliseconds = Date.now() - startTime;  
  console.log(`${request.method} ${request.url} \x1b[32m${response.status}\x1b[0m - ${elapsedMilliseconds}ms`);
}

const routeNotFoundMiddleware = (context: Context) => {
  context.response.status = 404;
  context.response.body = { message: 'Route not found' };
  context.response.type = 'json'
}



// Router
const router = new Router();
router.get('/healthcheck', (context: Context) => {
  context.response.status = 200;
  context.response.body = { message: 'Success' };
  context.response.type = 'json';
});

router.get('/error', () => {
  throw new Error('Boo');
});

router.get('/fetch', async (context: Context) => {
  const fetchResults = await fetch('https://restcountries.com/v3.1/independent?status=true&fields=capital');
  context.response.status = 200;
  context.response.body = fetchResults.body;
  context.response.type = 'json';
})



// Application
const app = new Application()
  .use(errorMiddleware)
  .use(loggingMiddleware)
  .use(router.routes())
  .use(routeNotFoundMiddleware)
  .listen({ port: Config.port });




export { app };
