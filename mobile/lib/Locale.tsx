import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { LocaleEnum, type ILocaleEnum } from '@/lib/store';

export { LocaleEnum, type ILocaleEnum };

const localeKey = 'locale';

const listeners = new Set<() => void>();

let currentLocale: ILocaleEnum = getDeviceLocale();

const LocaleContext = createContext<ILocaleEnum>(currentLocale);
LocaleContext.displayName = 'LocaleContext';

function getDeviceLocale(): ILocaleEnum {
  const languageCode = Localization.getLocales()[0]?.languageCode ?? 'en';
  return languageCode.includes('ja') ? LocaleEnum.ja : LocaleEnum.en;
}

function notifyLocaleChange() {
  listeners.forEach((listener) => listener());
}

function parseLocale(value: string | null): ILocaleEnum | null {
  if (value === LocaleEnum.ja) return LocaleEnum.ja;
  if (value === LocaleEnum.en) return LocaleEnum.en;
  return null;
}

export async function loadLocale(): Promise<ILocaleEnum> {
  const saved = await AsyncStorage.getItem(localeKey);
  const locale = parseLocale(saved) ?? getDeviceLocale();
  currentLocale = locale;
  return locale;
}

export function getLocale() {
  return currentLocale;
}

export async function setLocale(
  locale?: ILocaleEnum | ((lastLocale: ILocaleEnum) => ILocaleEnum | undefined)
) {
  const lastLocale = currentLocale;
  const newLocale = typeof locale === 'function' ? locale(lastLocale) : locale;

  if (!newLocale) {
    await AsyncStorage.removeItem(localeKey);
    currentLocale = getDeviceLocale();
  } else {
    await AsyncStorage.setItem(localeKey, newLocale);
    currentLocale = newLocale;
  }

  if (lastLocale !== currentLocale) {
    notifyLocaleChange();
  }
}

export function useLocale() {
	return useContext(LocaleContext)
}

export default function Locale({children, ja}: {children: ReactNode; ja?: ReactNode}) {
	return <>{useLocale() === LocaleEnum.en ? children : ja ?? children}</>
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<ILocaleEnum>(getLocale);

  useEffect(() => {
    loadLocale().then(setLocaleState);

    const listener = () => setLocaleState(getLocale());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function locale<En, Ja>(en: En, {ja}: {ja?: Ja} = {}) {
	return getLocale() === LocaleEnum.en ? en : ja ?? en
}
