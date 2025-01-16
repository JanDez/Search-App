import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchModal } from '../../hooks/useSearchModal';
import { Search, X, AlertCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, filterUsers, User } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import SearchListItem from './SearchListItem';
import SearchFilters from './SearchFilters';

export default function SearchForm() {
    const [query, setQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debouncedQuery = useDebounce(query, 300);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLUListElement>(null);
    const { isOpen } = useSearchModal();
    const [searchStatus, setSearchStatus] = useState<string>('');
    const [filters, setFilters] = useState({
        gender: '',
        minAge: '',
        maxAge: '',
        email: ''
    });

    const { data: allUsers, error: queryError, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });

    const filteredUsers = useMemo(() => {
        if (!allUsers || !debouncedQuery) return [];
        const searchResults = filterUsers(allUsers, debouncedQuery);
        
        return searchResults.filter(user => {
            const matchesGender = !filters.gender || user.gender === filters.gender;
            const matchesAge = (!filters.minAge || user.dob.age >= parseInt(filters.minAge)) &&
                              (!filters.maxAge || user.dob.age <= parseInt(filters.maxAge));
            const matchesEmail = !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase());
            
            return matchesGender && matchesAge && matchesEmail;
        });
    }, [allUsers, debouncedQuery, filters]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!allUsers?.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev < allUsers.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0) {
                    setSelectedUser(allUsers[activeIndex]);
                }
                break;
            case 'Escape':
                setSelectedUser(null);
                break;
        }
    }, [allUsers, activeIndex]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (isLoading) {
            setSearchStatus('Searching for users...');
        } else if (allUsers && allUsers.length === 0 && query) {
            setSearchStatus('No users found');
        } else if (allUsers && allUsers.length > 0) {
            setSearchStatus(`Found ${allUsers.length} users`);
        }
    }, [allUsers, isLoading, query]);

    return (
        <div className="w-full mx-auto pb-2" role="search">
            <form onSubmit={handleSubmit} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search by name or email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Search users"
                    aria-controls="search-results"
                    aria-expanded={!!allUsers?.length}
                    className="w-full pl-10 p-4 rounded-t-lg border-b bg-background text-foreground border-border focus:outline-none"
                />
            </form>
            <SearchFilters filters={filters} onChange={setFilters} />

            <div className="sr-only" role="status" aria-live="polite">
                {searchStatus}
            </div>

            {query && (
                <div 
                    className="max-h-[15vh] overflow-y-auto"
                    role="region"
                    aria-live="polite"
                    aria-label="Search results"
                >
                    {isLoading ? (
                        <div className="p-4 text-center text-foreground/60 flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading results...
                        </div>
                    ) : queryError ? (
                        <div className="p-4 text-center text-red-500 flex items-center justify-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {queryError.message}
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="p-4 text-center text-foreground/60">No results found</div>
                    ) : (
                        <div>
                            <div className="px-4 py-2 text-sm text-foreground/60 border-b">
                                Found {filteredUsers.length} results
                            </div>
                            <ul id="search-results" className="p-2" ref={resultsRef}>
                                {filteredUsers.map((user: User, index) => (
                                    <SearchListItem
                                        key={user.login.uuid}
                                        user={user}
                                        isActive={index === activeIndex}
                                        onSelect={setSelectedUser}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {selectedUser && (
                <div 
                    className="m-4 p-4 border rounded-lg bg-accent/5 relative"
                    role="dialog"
                    aria-label="User details"
                >
                    <button
                        onClick={() => setSelectedUser(null)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent/30 transition-colors"
                        aria-label="Close user details"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                        <img 
                            src={selectedUser.picture.medium} 
                            alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
                            className="rounded-full"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">
                                {`${selectedUser.name.first} ${selectedUser.name.last}`}
                            </h2>
                            <p className="text-sm text-foreground/60">@{selectedUser.login.username}</p>
                        </div>
                    </div>
                    <dl className="grid gap-3">
                        <div className="grid grid-cols-4 gap-3">
                            <div>
                                <dt className="text-sm text-foreground/60">Gender</dt>
                                <dd className="mt-1 capitalize">{selectedUser.gender}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-foreground/60">Age</dt>
                                <dd className="mt-1">{selectedUser.dob.age} years</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-foreground/60">Phone</dt>
                                <dd className="mt-1">{selectedUser.phone}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-foreground/60">Location</dt>
                                <dd className="mt-1">
                                    {`${selectedUser.location.street.number} ${selectedUser.location.street.name}`}
                                </dd>
                                <dd>
                                    {`${selectedUser.location.city}, ${selectedUser.location.state}`}
                                </dd>
                                <dd>{selectedUser.location.country}</dd>
                            </div>
                        </div>
                        <div>
                            <dt className="text-sm text-foreground/60">Email</dt>
                            <dd className="mt-1">{selectedUser.email}</dd>
                        </div>
                    </dl>
                </div>
            )}
        </div>
    );
}
