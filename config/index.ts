import { load } from '@std/dotenv';
const env: Record<string, string> = await load();

class Config {
  static port: number = parseInt(env.PORT);
}

export { Config };