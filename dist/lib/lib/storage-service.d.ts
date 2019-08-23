import { StorageType } from './storage-type.enum';
export declare abstract class StorageService {
    abstract updateStorageType(storageType: StorageType): boolean;
    abstract get(key: string): Promise<string>;
    abstract set(key: string, value: string, date: string): Promise<void>;
    abstract remove(key: string): Promise<void>;
}
