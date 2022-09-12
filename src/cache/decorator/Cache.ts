import { AbstractBaseStrategy } from '../strategy/caching/AbstractBaseStrategy';
import { IKeyStrategy } from '../strategy/key/IKeyStrategy';
import { JsonStringifyKeyStrategy } from '../strategy/key/JsonStringifyKeyStrategy';

const defaultKeyStrategy = new JsonStringifyKeyStrategy();

export const Cache = (cachingStrategy: AbstractBaseStrategy, options: any, keyStrategy: IKeyStrategy = defaultKeyStrategy) => {
  return function decorator(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function describe (...args: any[]): Promise<any> {
      const cacheKey = await keyStrategy.getKey(className, methodName, args);

      const entry = await cachingStrategy.getItem(cacheKey);
      if (entry) {
        return entry;
      }

      const methodCall = originalMethod.apply(this, args);
      let methodResult;
      if (methodCall && methodCall.then) {
        methodResult = await methodCall;
      } else {
        methodResult = methodCall;
      }

      await cachingStrategy.setItem(cacheKey, methodResult, options);

      return methodResult;
    };

    return descriptor;
  };
};
