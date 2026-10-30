import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import translations from '../utils/translations';

function useTranslate() {
  const { locale } = useContext(LocaleContext);

  return (key) => translations[locale][key] ?? translations.id[key] ?? key;
}

export default useTranslate;
