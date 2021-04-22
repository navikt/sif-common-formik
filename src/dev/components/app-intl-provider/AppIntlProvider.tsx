import React from 'react';
import { IntlProvider } from 'react-intl';
import { appMessages } from './messages';
import ferieMessages from '../../examples/formik-example/ferieuttak-example/ferieuttakMessages';
import { MessageFileFormat } from '../../utils/devIntlUtils';

export interface IntlProviderProps {
    locale: string;
    onError?: (error: any) => void;
}

const allMessages: MessageFileFormat = {
    nb: {
        ...appMessages.nb,
        ...ferieMessages.nb,
    },
    nn: {
        ...appMessages.nn,
        ...ferieMessages.nn,
    },
};

const AppIntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, onError, children }) => {
    const messages = locale === 'nb' ? allMessages.nb : allMessages.nn;
    return (
        <IntlProvider locale={locale} messages={messages} onError={onError}>
            {children}
        </IntlProvider>
    );
};

export default AppIntlProvider;
