import { useLanguageStore } from '@/store/language'
import { translations, type TranslationKey } from '@/lib/i18n'

export function useT() {
  const locale = useLanguageStore((s) => s.locale)
  return (key: TranslationKey) => translations[locale][key]
}
