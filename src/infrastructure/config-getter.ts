import { Config, ConfigTypes } from './load-configuration';
import { ConfigService } from '@nestjs/config';

export function configGetter<T extends ConfigTypes>(configType: T) {
  return (config: ConfigService): Config[T] => config.get(configType)!;
}
