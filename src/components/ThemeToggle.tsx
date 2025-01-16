import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import * as Toggle from '@radix-ui/react-toggle';

const ThemeToggle = React.memo(() => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Toggle.Root
            className="Toggle fixed top-4 right-4"
            aria-label="Toggle theme"
            pressed={theme === 'dark'}
            onPressedChange={toggleTheme}
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Toggle.Root>
    );
});

export default ThemeToggle;
