import './App.css';
import AppRouter from "./utils/router/AppRouter";
import Navbar from "./components/layout/Navbar/Navbar";
import MainLayout from "./components/layout/MainLayout/MainLayout";

function App() {

    return (
        <AppRouter>
            <MainLayout/>
        </AppRouter>
    );
}

export default App;
