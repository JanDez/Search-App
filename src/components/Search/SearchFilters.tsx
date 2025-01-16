import { memo } from 'react';
import { X } from 'lucide-react';

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

    return (
        <div className="p-4 space-y-4 border-b">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
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
    );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;