import { FirebaseAuthError } from "./FirebaseAuthError";

export interface FirebaseListener {
    OnSignUpComplete(email: string): void;
    OnSignInComplete(email: string): void;
    OnSignInCheck(email: string): void;
    OnSignOutComplete(): void;
    OnAuthError(error: FirebaseAuthError): void;
    OnDataListComplete(dataList: any[]): void;
    OnDataCreateComplete(): void;
    OnDataUpdateComplete(): void;
    OnDataRemoveComplete(): void;
    OnDataOperatoinError(): void;
}