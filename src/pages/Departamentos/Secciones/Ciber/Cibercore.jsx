import { Image } from "@mantine/core";

function Cibercore() {
    return (
        <div id="cibercore">

            <Image
                className="cibercore-htb-logo"
                src="https://account.hackthebox.com/images/logos/logo-htb.svg"
                alt="Hack The Box Logo"
                fit="cover"

            />
            <h1>Cibercore</h1>
            <p>Somos cibercore la seccion de ciberseguridad de coredumped hacemos ctfs y maquinas en
                htb ven a conocernos
            </p>
            <a href="https://upm-1.gitbook.io/cybercore-writeups" target="_blank" rel="noopener noreferrer">
                Link a nuestra web
            </a>
        </div >
    )
}

export default Cibercore;