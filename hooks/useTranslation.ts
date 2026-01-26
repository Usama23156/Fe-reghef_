import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ar from "@/message/ar.json";
import en from "@/message/en.json";

const messages = { ar, en };

export default function useTranslation() {
  const lang = useSelector((state: RootState) => state.language.lang);

  return {
    lang,
    t: messages[lang],
  };
}
