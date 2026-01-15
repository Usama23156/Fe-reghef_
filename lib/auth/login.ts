import { supabase } from "@/api/client";

interface LoginData {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};