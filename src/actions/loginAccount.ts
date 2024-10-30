// src/actions/loginAccount.ts
import { projectAuth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginResponse {
  success: boolean;
  error?: any;
}

export async function loginAccount(email: string, password: string): Promise<LoginResponse> {
  try {
    await signInWithEmailAndPassword(projectAuth, email, password);
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error };
  }
}