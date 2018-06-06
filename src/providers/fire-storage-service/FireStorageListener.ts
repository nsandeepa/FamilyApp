import { FireStorageError } from "./FireStorageError";

export interface FireStorageListener {
    OnUploadCompleted(url: string): void;
    OnDownloadUrlCompleted(url: string): void;
    OnStorageOperationError(error: FireStorageError): void;
}