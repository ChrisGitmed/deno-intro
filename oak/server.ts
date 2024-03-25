// deno-lint-ignore-file no-explicit-any
import { Application } from 'jsr:@oak/oak/application';
import { Router } from 'jsr:@oak/oak/router';

import { Config } from '../config/index.ts';


const router = new Router();
router.get('/', (context: any) => context.json({ message: 'Success' }));

const app = new Application()
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: Config.port });

  
export { app };
