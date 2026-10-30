import { createContext } from 'react';

const LocaleContext = createContext({
  locale: 'id',
  toggleLocale: () => {},
});

export default LocaleContext;
