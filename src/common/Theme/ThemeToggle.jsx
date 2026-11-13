import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computed = useComputedColorScheme('dark', { getInitialValueInEffect: true });

    const toggle = () => setColorScheme(computed === 'dark' ? 'light' : 'dark');

    return (
        <ActionIcon
            onClick={toggle}
            variant="default"
            size="lg"
            radius="md"
            aria-label={computed === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            {computed === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
    );
}