
export interface UserEntity {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    exp: number | null;
    groups: string[];
    profile: string
}


type ROLE = 'admin' | 'advisor' | 'driver' | 'passenger'
export interface MockUser {
    username: string,
    password: string,
    role: ROLE
    profile: string
}


