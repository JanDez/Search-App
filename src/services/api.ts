import axios from 'axios';

export interface User {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
    };
    email: string;
    phone: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    login: {
        uuid: string;
        username: string;
    };
    dob: {
        age: number;
        date: string;
    };
}

interface RandomUserResponse {
    results: User[];
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
}

const CACHE_KEY = 'randomUserData';

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { results, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < 5 * 60 * 1000) {
                return results;
            }
        }

        const { data } = await axios.get<RandomUserResponse>('https://randomuser.me/api/', {
            params: {
                results: 2000,
                nat: 'us,gb,fr',
                inc: 'name,email,login,picture,phone,location,gender,dob'
            }
        });

        // Store only essential data
        const trimmedResults = data.results.map(user => ({
            name: user.name,
            email: user.email,
            login: user.login,
            picture: user.picture,
            phone: user.phone,
            location: user.location,
            gender: user.gender,
            dob: user.dob
        }));

        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                results: trimmedResults,
                timestamp: Date.now()
            }));
        } catch (storageError) {
            console.warn('Cache storage failed:', storageError);
            // Continue without caching
        }

        return data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const filterUsers = (users: User[], query: string): User[] => {
    if (!query) return [];
    const searchLower = query.toLowerCase();
    return users.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        const email = user.email.toLowerCase();
        const username = user.login.username.toLowerCase();
        
        return fullName.includes(searchLower) ||
               email.includes(searchLower) ||
               username.includes(searchLower);
    });
}; 