import { useEffect, useCallback, useRef } from 'react';
import { useSearchModal } from '../../hooks/useSearchModal';
import SearchForm from './SearchForm';
import CloseButton from './CloseButton';
import { ErrorBoundary } from '../ErrorBoundary';

export default function SearchModal() {
    const { isOpen, closeModal } = useSearchModal();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            isOpen ? closeModal() : useSearchModal.getState().openModal();
        }
    }, [isOpen, closeModal]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!isOpen) return null;

    return (
        <ErrorBoundary>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-[10vh]" onClick={handleBackdropClick}>
                <div className="relative w-full max-w-[900px] mx-4">
                    <CloseButton onClick={closeModal} />
                    <div 
                        ref={modalRef} 
                        className="bg-background rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(255, 255, 255, 0.05)] border-[0.5px] border-border"
                    >
                        <SearchForm />
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}
