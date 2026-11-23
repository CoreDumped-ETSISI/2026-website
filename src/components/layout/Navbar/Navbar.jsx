import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import {
    Container, Group, Anchor, Burger, Drawer, Stack,
    NavLink, Image, Text, SegmentedControl, useComputedColorScheme
} from "@mantine/core";

import { useLang, msg } from "../../../i18n/lang"
import logoBlack from "../../../../assets/icons/core-black-inner.svg";
import logoWhite from "../../../../assets/icons/core-white-inner.svg";

import ThemeToggle from "../../../common/Theme/ThemeToggle";

const links = [
    { label: msg("Inicio"), path: "/" },
    { label: msg("Conócenos"), path: "/conocenos" },
    { label: msg("Tienda"), path: "/tienda" },
    { label: msg("Tablón"), path: "/tablon" },
    { label: msg("Departamentos"), path: "/departamentos" },
    { label: msg("Colaboradores"), path: "/colaboradores" },
    { label: msg("Contacto"), path: "/contacto" }
];

export default function Navbar() {
    const { lang, setLang, t } = useLang();
    const [opened, { toggle, close }] = useDisclosure(false);
    const location = useLocation();
    const computed = useComputedColorScheme("light");
    const logoSrc = computed === "dark" ? logoWhite : logoBlack;

    const languageSwitcher = (
        <SegmentedControl
            size="xs"
            value={lang}
            onChange={setLang}
            aria-label={t("Idioma")}
            data={[
                { value: "es", label: "ES" },
                { value: "en", label: "EN" }
            ]}
        />
    );
    const themeSwitcher = (
        <ThemeToggle />
    );

    return (
        <nav aria-label={t("Navegación principal")}>
            <Container size="xl" h={70}>
                <Group justify="space-between" wrap="nowrap" h="100%">
                    <Anchor component={Link} to="/" underline="never" c="var(--text)">
                        <Group gap="xs" wrap="nowrap">
                            <div className="navbar-logo" style={{ display: "flex", alignItems: "end", color: "var(--text)" }} alt={t("Logo de CoreDumped")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="promp" viewBox="0 0 112.57 154.99" height={32} width={31} fill="currentColor">
                                    <title>{t("Logo de CoreDumped")}</title>
                                    <path fillRule="evenodd" d="M112.57,72.68V83.35a12.92,12.92,0,0,1-5.44,10.42L6.37,154.25c-2.59,1.89-6.35.14-6.36-3l0-9.2a15.65,15.65,0,0,1,6.59-12.68L83.78,83.63A7.24,7.24,0,0,0,83.86,72L6.38,21.7A15.64,15.64,0,0,1,0,9.18L0,3.73C0,.61,3.83-1.12,6.42.82L107.3,62.36A12.9,12.9,0,0,1,112.57,72.68Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className="cursor" viewBox="0 0 112.65 14.6" height={3} width={20} fill="currentColor">
                                    <title>{t("Logo de CoreDumped")}</title>
                                    <rect x="0" y="0" width="112.65" height="14.6" rx="2.55" ry="2.55" />
                                </svg>
                                {/* <Image
                                    src={logoSrc}
                                    alt={t("Logo de CoreDumped")}
                                    h={36}
                                    w="auto"
                                    fit="contain"
                                /> */}
                            </div>
                            <Text
                                fw={700}
                                size="lg"
                                visibleFrom="sm"
                                style={{ fontFamily: "Cont" }}
                                sx={{
                                    transition: 'color 0.2s ease',
                                    '&:hover': {
                                        color: 'var(--accent-hover)',
                                    },
                                }}
                            >
                                CoreDumped
                            </Text>
                        </Group>
                    </Anchor>

                    <Group gap="lg" visibleFrom="md">
                        {links.map((link) => {
                            const active = location.pathname === link.path;
                            return (
                                <Anchor
                                    key={link.path}
                                    component={Link}
                                    to={link.path}
                                    c={active ? "green.8" : "var(--text)"}
                                    fw={active ? 700 : 400}
                                    underline="never"
                                    aria-current={active ? "page" : undefined}
                                >
                                    {t(link.label)}
                                </Anchor>
                            );
                        })}
                        {languageSwitcher}
                        {themeSwitcher}
                    </Group>

                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="md"
                        aria-label={
                            opened
                                ? t("Cerrar menú de navegación")
                                : t("Abrir menú de navegación")
                        }
                        aria-expanded={opened}
                    />
                </Group>

                <Drawer
                    opened={opened}
                    onClose={close}
                    title={t("Navegación")}
                    position="right"
                    size="xs"
                >
                    <Stack gap="xs">
                        {links.map((link) => {
                            const active = location.pathname === link.path;
                            return (
                                <NavLink
                                    key={link.path}
                                    component={Link}
                                    to={link.path}
                                    label={t(link.label)}
                                    active={active}
                                    aria-current={active ? "page" : undefined}
                                    onClick={close}
                                />
                            );
                        })}
                        {languageSwitcher}
                        {themeSwitcher}
                    </Stack>
                </Drawer>
            </Container>
        </nav>
    );
}