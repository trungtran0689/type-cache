import { IStorage } from '../../storage/IStorage';
import { ICacheStrategy } from './ICacheStrategy';

// @ts-ignore
export abstract class AbstractBaseStrategy implements ICacheStrategy {
  constructor(protected storage: IStorage) { }

  public abstract getItem<T>(key: string): Promise<T>;
  public abstract setItem(key: string, content: any, options: any): Promise<void>;
  public abstract clear(): Promise<void>;
}
