import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

export const getCountryName = (isoCode: string, locale: string): string => {
    const names = countries.getNames(locale);
    return names[isoCode];
};

export const getCountries = () => countries;
