import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Lang = "ar" | "en";

interface LanguageState {
  lang: Lang;
}

const initialState: LanguageState = {
  lang: "ar",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
