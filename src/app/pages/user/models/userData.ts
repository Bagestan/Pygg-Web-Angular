export interface UserData {
  company: string;
  uid: string;
  email: string;
  emailVerified?: boolean;
  disabled?: boolean;
  metadata?: {
    lastSignInTime?: string;
    creationTime?: string;
    lastRefreshTime?: string;
  };
  passwordHash?: string;
  passwordSalt?: string;
  tokensValidAfterTime?: string;
  providerData?: [
    {
      uid?: string;
      email?: string;
      providerId?: string;
    }
  ];
}

export interface UserAuth {
  email: string;
  password: string;
  uid: string;
  disabled: boolean;
}
