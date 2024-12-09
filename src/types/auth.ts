export interface User {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}