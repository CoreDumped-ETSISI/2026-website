import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "@mantine/core";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { T } from "../../../i18n/lang";

export default function MainLayout() {
    const { pathname } = useLocation();
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        document.getElementById("main-content")?.focus({ preventScroll: true });
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <a href="#main-content" className="skip-link">
                <T>Saltar al contenido principal</T>
            </a>


            <AppShell padding={0} header={{ height: 70 }} footer={{ height: 120 }}>
                <AppShell.Header>
                    <Navbar />
                </AppShell.Header>

                {/* Columna flex de al menos 100dvh: el contenido crece (flex: 1)
                    y el footer queda siempre al final, sin quitarle espacio */}
                <AppShell.Main
                    style={{
                        minHeight: "100dvh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <main
                        id="main-content"
                        tabIndex={-1}
                        style={{ flex: 1, outline: "none" }}
                    >
                        <Outlet />
                    </main>
                    <Footer />
                </AppShell.Main>
            </AppShell>
        </>
    );
}