// src/lib/auth/signupHandler.ts
import { AppDispatch } from "@/store/store";
import { setUser, setLoading } from "@/store/authSlice";
import { supabase } from "@/api/client";

interface SignupData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export const signupUser = async (
  dispatch: AppDispatch,
  data: SignupData
) => {
  try {
    dispatch(setLoading(true));

    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);

    if (result.user) {
      dispatch(
        setUser({
          id: result.user.id,
          email: result.user.email || "",
          name: data.name,
          phone: data.phone,
          created_at: result.user.created_at || "",
        })
      );
    }
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};
