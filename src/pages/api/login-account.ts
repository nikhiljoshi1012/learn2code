// src/pages/api/login-account.ts
import type { APIRoute } from 'astro';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { projectAuth } from '@/firebase/config';

export const post: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signInWithEmailAndPassword(projectAuth, email, password);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), { status: 500 });
  }
};
