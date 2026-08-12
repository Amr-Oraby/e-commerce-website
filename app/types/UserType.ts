export interface UserSettings {
  language: string;
  allow_notifications: boolean;
}

export interface UserData {
  id: number;
  name: string;
  email: string | null;
  phone_code: string;
  phone: string;
  image: string | null;
  user_type: string;
  is_verified: boolean;
  is_banned: boolean;
  is_suspended: boolean;
  settings: UserSettings;
  token: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: UserData;
}
