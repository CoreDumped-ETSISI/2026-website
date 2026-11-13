import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "@mantine/core";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { T } from "../../../i18n/lang";

export default function MainLayout() {
    const { pathname } = useLocation();
    const firstRender = useRef(true);

    // Al cambiar de ruta: foco al contenido y scroll arriba (no en la carga inicial)
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

            <AppShell padding={0} header={{ height: 70 }}>
                <AppShell.Header>
                    <Navbar />
                </AppShell.Header>

                <AppShell.Main
                    id="main-content"
                    tabIndex={-1}
                    style={{ minHeight: "100dvh", outline: "none" }}
                >
                    <Outlet />
                </AppShell.Main>
                <AppShell.Footer>
                    <Footer />
                </AppShell.Footer>
            </AppShell>
        </>
    );
}