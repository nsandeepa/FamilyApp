import { OnDisconnect } from "@firebase/database";

export interface FirebaseListener {
    OnSignUpComplete(email: string): void;
    OnSignInComplete(email: string): void;
    OnSignInCheck(email: string): void;
}