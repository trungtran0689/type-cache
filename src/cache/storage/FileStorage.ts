// import Bluebird from 'bluebird';
import * as fs from 'fs';
import path from 'path';

import { IStorage } from './IStorage';

const FS: any = { ...fs, ...fs.promises };

export class FileStorage implements IStorage {
  private options: any;
  constructor(public cachePath: string, options?: any) {
    if (!FS.existsSync(this.cachePath)) {
      this.createCacheDir();
    }
    this.options = options || {};
  }

  public async getItem<T>(key: string): Promise<T> {
    return this.getCache(key);
  }

  public setItem(key: string, content: any): Promise<void> {
    return this.setCache(key, content);
  }

  public async clear(): Promise<void> {
    const files = FS.readdirSync(this.cachePath);
    const filesMap = files.map( file => {
      return FS.unlink(path.join(this.cachePath, file));
    });
    return Promise.all(filesMap)
      .then(() => {
        if (this.options.clearAll) {
          this.removeCacheDir();
          if (this.options.recreateCacheDir) {
            this.createCacheDir();
          }
        }
      });
  }

  private createCacheDir(): void {
    FS.mkdirSync(this.cachePath);
  }

  private removeCacheDir(): void {
    FS.rmdirSync(this.cachePath);
  }

  private getFilePath(key: string): string {
    return path.join(this.cachePath, `${key}.cache`);
  }

  private setCache(key: string, content: any): Promise<void> {
    const filePath = this.getFilePath(key);
    if (!content) { return FS.unlink(filePath); }

    return FS.writeFile(filePath, JSON.stringify(content));
  }

  private getCache(key: string): Promise<any> {
    const filePath = this.getFilePath(key);
    return FS.readFile(filePath)
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        return undefined;
      });
  }
}
