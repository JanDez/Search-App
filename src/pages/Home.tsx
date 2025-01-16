import ThemeToggle from '../components/ThemeToggle';
import SearchModal from '../components/Search/SearchModal';
import { useSearchModal } from '../hooks/useSearchModal';
import SearchButton from '../components/Search/SearchButton';

export default function Home() {
    const { isOpen } = useSearchModal();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-background text-foreground">
            <ThemeToggle />
            <h1 className="mb-8 text-4xl font-bold text-center">Searcher App</h1>
            <p className="text-center text-lg mb-4">
                Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">⌘ K</kbd> to search
            </p>
            <SearchButton />
            <SearchModal />
            {isOpen && <SearchModal />}
        </main>
    );
}
