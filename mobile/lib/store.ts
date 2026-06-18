import makeEnum, {type IEnum} from 'mkenum'

export const LocaleEnum = makeEnum('en', 'ja')
export type ILocaleEnum = IEnum<typeof LocaleEnum>