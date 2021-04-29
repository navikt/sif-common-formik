import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Systemtittel } from 'nav-frontend-typografi';
import NAVLogo from './components/svg/NAVLogo';
import DevContent from './DevContent';
import './styles/dev.less';

const DevPage = () => {
    return (
        <main className="devPage">
            <header className="header">
                <span className="navLogo">
                    <NAVLogo />
                </span>
                <span className="header__title">
                    <Systemtittel tag="h1">sif-common-formik</Systemtittel>
                </span>
            </header>
            <div className="contentWrapper">
                <HashRouter>
                    <DevContent />
                </HashRouter>
            </div>
        </main>
    );
};

export default DevPage;
