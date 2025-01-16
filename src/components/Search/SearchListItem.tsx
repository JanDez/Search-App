import { memo } from 'react';
import { User } from '../../services/api';

interface SearchListItemProps {
    user: User;
    isActive: boolean;
    onSelect: (user: User) => void;
}

const SearchListItem = memo(({ user, isActive, onSelect }: SearchListItemProps) => {
    return (
        <li>
            <button
                className={`w-full text-left flex items-center gap-3 p-2 hover:bg-accent/30 rounded-lg transition-colors ${
                    isActive ? 'bg-accent/30' : ''
                }`}
                onClick={() => onSelect(user)}
                aria-selected={isActive}
            >
                <img 
                    src={user.picture.thumbnail} 
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <div className="text-foreground font-medium">
                        {`${user.name.first} ${user.name.last}`}
                    </div>
                    <div className="text-sm text-foreground/60">{user.email}</div>
                </div>
            </button>
        </li>
    );
});

SearchListItem.displayName = 'SearchListItem';

export default SearchListItem; 