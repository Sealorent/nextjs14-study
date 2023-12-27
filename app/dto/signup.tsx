export class SignUpDto {
    email: string;
    username : string;
    phone : string;
    password: string;
    role?: string;

    constructor(username: string, email: string, phone : string, password: string, role: string) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
    }
}
