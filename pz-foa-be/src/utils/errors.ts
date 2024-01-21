export class AuthError extends Error {
  public name: string = 'AuthError';
  constructor(args: string) {
    super(args);
  }
}

export class AuthErrorUnauthorized extends AuthError {}
export class AuthErrorNotFound extends AuthError {}
export class AuthErrorInvalidInput extends AuthError {}
export class AuthErrorUserTaken extends AuthError {}

export class ProductError extends Error {
  public name: string = 'ProductError';
  constructor(args: string) {
    super(args);
  }
}

export class ProductErrorInertionFailed extends ProductError {}
export class ProductErrorNotFound extends ProductError {}
