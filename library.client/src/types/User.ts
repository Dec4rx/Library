export interface registerUser {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface loginUser {
    email: string;
    password: string;
}