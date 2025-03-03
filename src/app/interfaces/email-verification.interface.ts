export interface EmailVerificationStatus {
  emailVerified: boolean;
  verificationMessage: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
} 