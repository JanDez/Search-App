import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-background text-foreground">
            <ThemeToggle />
        </main>
    );
}
