import { createHash } from 'crypto';

import { IKeyStrategy } from './IKeyStrategy';

const hash = (data: any) => createHash('sha256')
    .update(Buffer.from(data, 'utf8'))
    .digest('hex').substring(0, 64);

export class HashKeyStrategy implements IKeyStrategy {
  public getKey(className: string, methodName: string, args: any[]): Promise<string> | string  {
    const key = `${className}-${methodName}-${JSON.stringify(args)}`;
    const hashKey = hash(key);

    return hashKey;
  }
}
