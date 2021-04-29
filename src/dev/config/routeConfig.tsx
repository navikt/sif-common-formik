import React from 'react';
import FormikExample from '../examples/formik-example/FormikExample';
import ValideringExample from '../examples/validering-example/ValideringExample';
import Intro from '../Intro';

export interface RouteConfig {
    path: string;
    title: string;
    renderContent: () => React.ReactNode;
}

export const routes: RouteConfig[] = [
    {
        path: 'frontpage',
        title: 'Forside',
        renderContent: () => <Intro />,
    },
    {
        path: 'formik-example',
        title: 'TypedFormExample',
        renderContent: () => <FormikExample />,
    },
    {
        path: 'validering',
        title: 'Validering',
        renderContent: () => <ValideringExample />,
    },
];

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
    return routes.find((f) => isActiveRoute(f.path, pathname));
};

export const isActiveRoute = (path: string, pathname: string): boolean => {
    return pathname.indexOf(path) >= 0;
};
