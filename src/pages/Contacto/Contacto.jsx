import { Container } from "@mantine/core"
import "./Contacto.css"
import { T } from "../../i18n/lang"
import TerminalTypingTitle from "../../components/Animaciones/TerminalTypingTitle";
import UseSvg from "../../common/svg/UseSvg";
const contacts = [
    {
        href: "mailto:contacto@tudominio.com",
        content: "Correo electrónico",
        icon: "gmail",
        pathSpray: "/svg/contacto.svg",
        titleSvg: ""
    },
    {
        href: "tel:+34910000000",
        content: "Teléfono",
        icon: "phone",
        pathSpray: "/svg/contacto.svg",
        titleSvg: ""
    },
    {
        href: "https://www.linkedin.com/",
        content: "LinkedIn",
        icon: "linkedin",
        pathSpray: "/svg/contacto.svg",
        titleSvg: ""
    },
    {
        href: "https://github.com/",
        content: "GitHub",
        icon: "github",
        pathSpray: "/svg/contacto.svg",
        titleSvg: ""
    },
    {
        href: "https://www.instagram.com/",
        content: "Instagram",
        icon: "instagram",
        pathSpray: "/svg/contacto.svg",
        titleSvg: ""
    },
]

function Contacto() {
    return (
        <section id="contacto-page">
            <Container size="lg" py="xl" pb={120}>

                <TerminalTypingTitle><T>Contacto</T></TerminalTypingTitle>

                <T>Ponte en contacto con nosotros</T>
                <div className="contact-list">
                    {
                        contacts.map((contact, index) => (
                            <a
                                key={index}
                                href={contact.href}
                                {...(contact.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                            >
                                <UseSvg
                                    icon={contact.icon}
                                    pathSpray={contact.pathSpray}
                                    titleSvg={contact.titleSvg}
                                    style={{ width: 24, height: 24 }}
                                />
                                <T>
                                    {contact.content}
                                </T>
                            </a>
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}

export default Contacto