import { createContext, useContext, useState, type ReactNode } from 'react';
import { TRANSLATIONS, type Strings } from './translations';

export type Lang = 'en' | 'vi' | 'zh';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  s: Strings;
}

const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, s: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
