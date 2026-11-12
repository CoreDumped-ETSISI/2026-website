import {useDisclosure} from "@mantine/hooks";
import {Link, useLocation} from "react-router-dom";
import {
    Container, Group, Anchor, Burger, Drawer, Stack,
    NavLink, Image, Text, SegmentedControl, useComputedColorScheme
} from "@mantine/core";

import {useLang, msg} from "../../../i18n/lang"
import logoBlack from "../../../../assets/icons/core-black-inner.svg";
import logoWhite from "../../../../assets/icons/core-white-inner.svg";

import ThemeToggle from "../../../common/Theme/ThemeToggle";

const links = [
    {label: msg("Inicio"), path: "/"},
    {label: msg("Conócenos"), path: "/conocenos"},
    {label: msg("Tienda"), path: "/tienda"},
    {label: msg("Tablón"), path: "/tablon"},
    {label: msg("Departamentos"), path: "/departamentos"},
    {label: msg("Colaboradores"), path: "/colaboradores"},
    {label: msg("Contacto"), path: "/contacto"}
];

export default function Navbar() {
    const {lang, setLang, t} = useLang();
    const [opened, {toggle, close}] = useDisclosure(false);
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
                {value: "es", label: "ES"},
                {value: "en", label: "EN"}
            ]}
        />
    );
    const themeSwitcher = (
        <ThemeToggle/>
    );

    return (
        <nav aria-label={t("Navegación principal")}>
            <Container size="xl" h={70}>
                <Group justify="space-between" wrap="nowrap" h="100%">
                    <Anchor component={Link} to="/" underline="never" c="var(--text)">
                        <Group gap="xs" wrap="nowrap">
                            <Image
                                src={logoSrc}
                                alt={t("Logo de CoreDumped")}
                                h={36}
                                w="auto"
                                fit="contain"
                            />
                            <Text
                                fw={700}
                                size="lg"
                                visibleFrom="sm"
                                style={{fontFamily: "Cont"}}
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