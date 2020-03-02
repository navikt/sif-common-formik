import * as React from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { getCountries } from '../../utils/countryUtils';

interface Props extends Omit<SelectProps, 'onChange' | 'children'> {
    label: React.ReactNode;
    name: string;
    defaultValue?: string;
    locale?: string;
    onChange: (countryCode: string) => void;
    showOnlyEuAndEftaCountries?: boolean;
}

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

interface CountryOptionsCache {
    locale: string;
    options: React.ReactNode[];
}

const isoCodeIndex = 0;
const countryNameIndex = 1;

class CountrySelect extends React.Component<Props> {
    countryOptionsCache: CountryOptionsCache | undefined;
    constructor(props: Props) {
        super(props);
        this.getCountryOptions = this.getCountryOptions.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }

    updateCache(locale: string) {
        this.countryOptionsCache = {
            locale,
            options: createCountryOptions(
                this.props.showOnlyEuAndEftaCountries ? this.props.showOnlyEuAndEftaCountries : false,
                locale
            )
        };
    }

    getCountryOptions(locale): React.ReactNode[] {
        if (!this.countryOptionsCache || locale !== this.countryOptionsCache.locale) {
            this.updateCache(locale);
        }
        return this.countryOptionsCache && this.countryOptionsCache.options ? this.countryOptionsCache.options : [];
    }

    render() {
        const { onChange, name, showOnlyEuAndEftaCountries, locale, ...restProps } = this.props;
        return (
            <Select name={name} {...restProps} onChange={(e) => onChange(e.target.value)}>
                <option value="" />
                {this.getCountryOptions(locale)}
            </Select>
        );
    }
}

const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
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

const createCountryOptions = (onluEuAndEftaCountries: boolean, locale: string): React.ReactNode[] => {
    const localeToUse = locale === 'en' ? 'nn' : 'nb';
    const countries = getCountries();
    return Object.entries(countries.getNames(localeToUse))
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], localeToUse))
        .filter((countryOptionValue: string[]) =>
            filteredListEØSCountries(countryOptionValue[isoCodeIndex], onluEuAndEftaCountries)
        )
        .map((countryOptionValue: string[]) => (
            <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                {countryOptionValue[countryNameIndex]}
            </option>
        ));
};

export default CountrySelect;
