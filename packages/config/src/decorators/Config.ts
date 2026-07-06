export interface ConfigInjectionMetadata {
  readonly propertyKey: string | symbol;
  readonly configKey: string;
}

const CONFIG_INJECTION_METADATA = Symbol("config:inject");

export function Config(configKey: string): PropertyDecorator {
  return (target, propertyKey) => {
    const constructor = target.constructor as any;
    const metadata: ConfigInjectionMetadata[] = constructor[CONFIG_INJECTION_METADATA] ?? [];
    constructor[CONFIG_INJECTION_METADATA] = [
      ...metadata,
      { propertyKey, configKey },
    ];
  };
}

export function getInjectedConfigMetadata(target: Function): ConfigInjectionMetadata[] {
  return (target as any)[CONFIG_INJECTION_METADATA] ?? [];
}
