import { AppDispatch } from "@/store/store";
import { setUser, setLoading } from "@/store/authSlice";
import { supabase } from "@/api/client";

export const loginUser = async (
  dispatch: AppDispatch,
  email: string,
  password: string
) => {
  try {
    dispatch(setLoading(true));
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (data.user) {
      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          created_at: data.user.created_at || "",
        })
      );
    }
  } catch (err) {
    console.error("Login error:", (err as Error).message);
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};
