import "./utils/components/styles/background.css";
import Loading from "./sections/loading/Loading.jsx";
import QueHacemos from "./sections/que-hacemos/QueHacemos";
import QuienesSomos from "./sections/quienes-somos/QuienesSomos";
import VenAConocernos from "./sections/ven-a-conocernos/VenAConocernos";

export default function TempApp() {


    return (
        <main id="main-core">
            <Loading />
            <QueHacemos />
            <QuienesSomos />
            <VenAConocernos />
        </main>
    )
};
