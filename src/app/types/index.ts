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
  user: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
}

export interface UserData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  is_cg: boolean;
  user: number;
  profile_pic: string;
  recipients: Recipient[];
  user_id: string;
}
