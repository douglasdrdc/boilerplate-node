export abstract class RedisConfig {
  url!: string;
  options!: {
    password: string | undefined;
  };
}
