import { IKeyStrategy } from './IKeyStrategy';

export class JsonStringifyKeyStrategy implements IKeyStrategy {
  public getKey(className: string, methodName: string, args: any[]): Promise<string> | string {
    return `${className}:${methodName}:${JSON.stringify(args)}`;
  }
}
