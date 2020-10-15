import React from 'react';
import { IntlProvider } from 'react-intl';
import { appMessages } from './messages';

export interface IntlProviderProps {
    locale: string;
    children: React.ReactNode;
    onError?: (error: any) => void;
}

const AppIntlProvider = ({ locale, onError, children }: IntlProviderProps) => {
    const messages = locale === 'nb' ? appMessages.nb : appMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
