export interface User {
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  verificationToken: string;
  verificationTokenExpiry: number;
}

export interface LoginResponse {
  emailVerified: boolean;
  token: string;
  user: User;
  verificationMessage: string;
} 