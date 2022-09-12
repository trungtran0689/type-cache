
// import Bluebird from 'bluebird';
// import * as Redis from 'redis';

// import { IStorage } from './IStorage';

// Bluebird.promisifyAll<any>(Redis.RedisClient.prototype);
// Bluebird.promisifyAll<any>(Redis.Multi.prototype);

// interface RedisClient extends Redis.RedisClient {
//   getAsync?(arg: string): Promise<string>;

//   delAsync?(arg: string): Promise<void>;

//   setAsync?<T>(arg: string, arg2: string): Promise<void>;

//   flushdbAsync?(): Promise<void>;
// }

// export class RedisStorage implements IStorage {

//   private client: RedisClient;

//   constructor(private redisOptions: Redis.ClientOpts) {
//     this.client = Redis.createClient(this.redisOptions);
//   }

//   public async getItem<T>(key: string): Promise<T> {
//     const entry: any = await this.client.getAsync(key);
//     let finalItem = entry;
//     try {
//       finalItem = JSON.parse(entry);
//     } catch (error) {
//       finalItem = undefined;
//     }
//     return finalItem;
//   }

//   public async setItem(key: string, content: any): Promise<void> {
//     if (typeof content === 'object') {
//       content = JSON.stringify(content);
//     } else if (content === undefined) {
//       return this.client.delAsync(key);
//     }
//     return this.client.setAsync(key, content);
//   }

//   public async clear(): Promise<void> {
//     return this.client.flushdbAsync();
//   }
// }
