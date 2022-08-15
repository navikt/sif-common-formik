export const getLocaleToUse = (locale?: string): 'nb' | 'nn' | 'en' | undefined => {
    switch (locale) {
        case 'nb':
            return 'nb';
        case 'nn':
            return 'nn';
        case 'en':
            return 'en';
        default:
            return undefined;
    }
};
