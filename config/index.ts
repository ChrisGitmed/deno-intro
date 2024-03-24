import { load } from '@std/dotenv'
const env = await load();

class Config {
  static port = parseInt(env.PORT);
}

export { Config };