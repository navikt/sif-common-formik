import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

export const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
            case 'BE':
            case 'BG':
            case 'DK':
            case 'EE':
            case 'FI':
            case 'FR':
            case 'GR':
            case 'IE':
            case 'IS':
            case 'IT':
            case 'HR':
            case 'CY':
            case 'LV':
            case 'LI':
            case 'LT':
            case 'LU':
            case 'MT':
            case 'NL':
            case 'PL':
            case 'PT':
            case 'RO':
            case 'SK':
            case 'SI':
            case 'ES':
            case 'GB':
            case 'SE':
            case 'CZ':
            case 'DE':
            case 'HU':
            case 'AT':
            case 'CH':
                return true;
            default:
                return false;
        }
    } else {
        // Filter ut Antarktis
        return countryOptionValue !== 'AQ';
    }
};

export const getLocaleKey = (locale: string): string => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};

export const getCountryName = (alphaCode: string, locale: string): string => {
    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer NAV sin landkode av Kosovo til i18n-iso-countries sin landkode for å hente riktig landsnavn.
    if (alphaCode === 'XXK') {
        alphaCode = 'XKX';
    }
    return countries.getName(alphaCode, getLocaleKey(locale));
};

export const getAlpha3Code = (alpha2Code: string) => {
    const countryAlpha3Code = countries.alpha2ToAlpha3(alpha2Code).toUpperCase();

    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer i18n-iso-countries sin landkode til landkode som brukes i NAV for å sende riktig kode videre.
    return countryAlpha3Code === 'XKX' ? 'XXK' : countryAlpha3Code;
};

// Samme funksjon finnes i sif-common-core og brukes i applikasjoner
// Funksjonen her fikser Kosovo bug og skal brukes i applikasjoner
export const countryIsMemberOfEøsOrEftaNew = (isoCode: string) => {
    let isoCodeToUse = isoCode.toUpperCase();
    if (isoCodeToUse === 'XXK') {
        isoCodeToUse = 'XKX';
    }
    isoCodeToUse = isoCodeToUse.length === 2 ? isoCodeToUse : countries.alpha3ToAlpha2(isoCodeToUse);
    return filteredListEØSCountries(isoCodeToUse.toUpperCase(), true) === true;
};

export const getCountries = () => countries;
