import { useSearchModal } from '../../hooks/useSearchModal';
import { Search } from 'lucide-react';

export default function SearchButton() {
    const { openModal } = useSearchModal();

    return (
        <button
            onClick={openModal}
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
        >
            <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground" />
        </button>
    );
}
