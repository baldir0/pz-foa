export interface UserInterface {
  id: string;
  login: string;
  passwordHSW: string;
  email: string;
  createdAt: string;
  changedAt: string;
  token: string;
}

export interface UserRegisterInterface {
  login: string;
  passwordHSW: string;
  email: string;
}
