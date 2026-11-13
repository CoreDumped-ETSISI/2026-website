import './App.css';
import AppRouter from "./utils/router/AppRouter";
import MainLayout from "./components/layout/MainLayout/MainLayout";

import {MantineProvider} from '@mantine/core';
import {LanguageProvider} from "./i18n/lang";

function App() {

    return (
        <MantineProvider>
            <LanguageProvider>
                <AppRouter>
                    <MainLayout/>
                </AppRouter>
            </LanguageProvider>
        </MantineProvider>
    );
}

export default App;
