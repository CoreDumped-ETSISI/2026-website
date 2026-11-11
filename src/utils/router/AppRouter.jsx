import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home/Home";
import Conocenos from "../../pages/Conocenos/Conocenos";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import Tienda from "../../pages/Tienda/Tienda";
import Tablon from "../../pages/Tablon/Tablon";
import Departamentos from "../../pages/Departamentos/Departamentos";
import Colaboradores from "../../pages/Colaboradores/Colaboradores";
import Contacto from "../../pages/Contacto/Contacto";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/conocenos" element={<Conocenos />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/tablon" element={<Tablon />} />
                    <Route path="/departamentos" element={<Departamentos />} />
                    <Route path="/colaboradores" element={<Colaboradores />} />
                    <Route path="/contacto" element={<Contacto />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}