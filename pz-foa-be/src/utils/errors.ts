import messages from './../data/en-EN.json';

export class ErrorBase extends Error {
  public name: string;
  public statusCode: number;
  public message: string;
}

export class AuthError extends ErrorBase {
  public name: string = 'AuthError';
  public statusCode: number = 401;
  constructor(args?: string) {
    super(args);
  }
}

export class AuthErrorUnauthorized extends AuthError {
  public message: string = messages.ERROR.UNAUTHORIZED_USER;
}
export class AuthErrorNotFound extends AuthError {
  public message: string = messages.ERROR.USER_NOT_FOUND;
  public statusCode: number = 404;
}
export class AuthErrorInvalidLoginData extends AuthError {
  public message: string = messages.ERROR.INVALID_LOGIN_DATA;
  public statusCode: number = 400;
}
export class AuthErrorUserExists extends AuthError {
  public message: string = messages.ERROR.USER_ALREADY_EXIST;
  public statusCode: number = 409;
}
export class AuthErrorLackOfPrivilages extends AuthError {
  public message: string = messages.ERROR.LACK_OF_PRIVILAGES;
  public statusCode: number = 401;
}

export class ProductError extends ErrorBase {
  public name: string = 'ProductError';
  public statusCode: number = 400;
  constructor(args?: string) {
    super(args);
  }
}

export class ProductErrorInsertionFailed extends ProductError {
  public message: string = messages.ERROR.PRODUCT_INSERTION_FAILURE;
  public statusCode: number = 400;
}
export class ProductErrorNotFound extends ProductError {
  public message: string = messages.ERROR.PRODUCT_NOT_FOUND;
  public statusCode: number = 404;
}

export class OrderError extends ErrorBase {
  public name: string = 'OrderError';
  public statusCode: number = 400;
  constructor(args?: string) {
    super(args);
  }
}

export class OrderErrorNotFound extends OrderError {
  public message: string = messages.ERROR.ORDER_NOT_FOUND;
  public statusCode: number = 404;
}

export class OrderErrorInsertionFailed extends OrderError {
  public message: string = messages.ERROR.PRODUCT_INSERTION_FAILURE;
  public statusCode: number = 400;
}
