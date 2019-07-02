import { StorageType } from './storage-type.enum';

export abstract class StorageService {
  abstract updateStorageType(storageType: StorageType): boolean;

  abstract async get(key: string): Promise<string>;

  abstract async set(key: string, value: string, date: string): Promise<void>;

  abstract async remove(key: string): Promise<void>;
}
