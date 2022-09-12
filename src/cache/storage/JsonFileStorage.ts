import * as fs from 'fs';

import { IStorage } from './IStorage';

const FS: any = { ...fs, ...fs.promises };

export class JsonFileStorage implements IStorage {

  constructor(public jsonFilePath: string) {
    if (!FS.existsSync(this.jsonFilePath)) {
      this.createEmptyCache();
    }
  }

  public async getItem<T>(key: string): Promise<T> {
    return (await this.getCacheObject())[key];
  }

  public async setItem(key: string, content: any): Promise<void> {
    const cache = await this.getCacheObject();
    cache[key] = content;
    await this.setCache(cache);
  }

  public async clear(): Promise<void> {
    return this.createEmptyCache();
  }

  private createEmptyCache(): void {
    FS.writeFileSync(this.jsonFilePath, JSON.stringify({}));
  }

  private async setCache(newCache: any): Promise<void> {
    await FS.writeFile(this.jsonFilePath, JSON.stringify(newCache));
  }

  private async getCacheObject(): Promise<any> {
    return JSON.parse((await FS.readFile(this.jsonFilePath)).toString());
  }

}
