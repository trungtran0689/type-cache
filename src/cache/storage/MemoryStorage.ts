import { IStorage } from './IStorage';

export class MemoryStorage implements IStorage {
  private memCache: any = {};

  public async getItem<T>(key: string): Promise<T> {
    return this.memCache[key];
  }

  public async setItem(key: string, content: any): Promise<void> {
    this.memCache[key] = content;
  }

  public async clear(): Promise<void> {
    this.memCache = {};
  }
}
