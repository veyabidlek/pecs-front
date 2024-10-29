export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email?: string;
}

export interface Caregiver {
  user: User;
}

export interface Recipient {
  user: User;
}
