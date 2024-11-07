// src/pages/api/login-account.ts
import type { APIRoute } from 'astro';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { projectAuth } from '@/firebase/config';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signInWithEmailAndPassword(projectAuth, email, password);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
  }
};
