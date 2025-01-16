import { memo, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterState {
    gender: string;
    minAge: string;
    maxAge: string;
    email: string;
}

interface SearchFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
}

const SearchFilters = memo(({ filters, onChange }: SearchFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleChange = (key: keyof FilterState, value: string) => {
        onChange({ ...filters, [key]: value });
    };

    const resetFilters = () => {
        onChange({
            gender: '',
            minAge: '',
            maxAge: '',
            email: ''
        });
    };

    const hasActiveFilters = filters.gender || filters.minAge || filters.maxAge || filters.email;

    return (
        <div className="border-b">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
                aria-expanded={isExpanded}
                aria-controls="filter-section"
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {hasActiveFilters && (
                        <span className="px-2 py-1 text-xs bg-accent/20 rounded-full">
                            Active
                        </span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>

            <div
                id="filter-section"
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-end">
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg hover:bg-accent/30 transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Reset Filters
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={filters.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground"
                            >
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Age Range</label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minAge}
                                        onChange={(e) => handleChange('minAge', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border bg-background text-foreground appearance-none"
                                        min="18"
                                        max="100"
                                    />
                                </div>
                                <div className="flex-shrink-0 text-foreground/60">to</div>
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxAge}
                                        onChange={(e) => handleChange('maxAge', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border bg-background text-foreground appearance-none"
                                        min="18"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium" htmlFor="email">
                                Email Domain
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="e.g. @example.com"
                                value={filters.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;