import {createContext, ReactNode, useContext, useEffect} from 'react'
import makeEnum, {type IEnum} from 'mkenum'

const localeKey = 'locale'
export const LocaleEnum = makeEnum('en', 'ja')
export type ILocaleEnum = IEnum<typeof LocaleEnum>

const LocaleContext = createContext<ILocaleEnum>(getLocale())
LocaleContext.displayName = 'LocaleContext'

export function getLocale() {
	const locale = localStorage.getItem(localeKey)
	if (locale === LocaleEnum.ja) return LocaleEnum.ja
	if (locale === LocaleEnum.en) return LocaleEnum.en
	return navigator.language.includes('ja') ? LocaleEnum.ja : LocaleEnum.en
}
export function setLocale(locale?: ILocaleEnum | ((lastLocale: ILocaleEnum) => ILocaleEnum | undefined)) {
	const lastLocale = getLocale()
	const newLocale = typeof locale === 'function' ? locale(lastLocale) : locale
	if (!newLocale) localStorage.removeItem(localeKey)
	else localStorage.setItem(localeKey, newLocale)
}

export function useLocale() {
	return useContext(LocaleContext)
}

export default function Locale({children, ja}: {children: ReactNode; ja?: ReactNode}) {
	return <>{useLocale() === LocaleEnum.en ? children : ja ?? children}</>
}

export function LocaleProvider({children}: {children: ReactNode}) {
	return <LocaleContext value={getLocale()}>{children}</LocaleContext>
}

export function locale<En, Ja>(en: En, {ja}: {ja?: Ja} = {}) {
	return getLocale() === LocaleEnum.en ? en : ja ?? en
}
