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

export class AuthErrorMissingLogin extends AuthError {
  public message: string = messages.ERROR.MISSING_LOGIN_OR_EMAIL;
  public statusCode: number = 400;
}

export class AuthErrorMissingPassword extends AuthError {
  public message: string = messages.ERROR.MISSING_PASSWORD;
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

export enum DataTransferErrorType {
  DTE_EMPTY_FIELD,
  DTE_INVALID_EMAIL,
  DTE_TOO_LONG,
  DTE_INVALID_TYPE,
}

export class DataTransferError extends ErrorBase {
  public name: string = 'DataTransferError';
  public statusCode: number = 400;

  public static dispatch(error: DataTransferErrorType, field: string) {
    switch (error) {
      case DataTransferErrorType.DTE_EMPTY_FIELD:
        throw new DataTransferError_EmptyField(field);
      case DataTransferErrorType.DTE_INVALID_EMAIL:
        throw new DataTransferError_InvalidEmail();
      case DataTransferErrorType.DTE_INVALID_TYPE:
        throw new DataTransferError_InvalidType(field);
      case DataTransferErrorType.DTE_TOO_LONG:
        throw new DataTransferError_TooLong(field);
    }
  }
}

export class DataTransferError_EmptyField extends DataTransferError {
  public message: string = messages.ERROR.DATA_TRANSFER_MISSING_FIELD;
  public statusCode: number = 400;
  constructor(field: string) {
    super();
    this.message = this.message + field;
  }
}

export class DataTransferError_InvalidEmail extends DataTransferError {
  public message: string = messages.ERROR.DATA_TRANSFER_INVALID_EMAIL;
  public statusCode: number = 400;
}

export class DataTransferError_TooLong extends DataTransferError {
  public message: string = messages.ERROR.DATA_TRANSFER_VALUE_IS_TOO_LONG;
  public statusCode: number = 400;
  constructor(field: string) {
    super();
    this.message = field + this.message;
  }
}

export class DataTransferError_InvalidType extends DataTransferError {
  public message: string = messages.ERROR.DATA_TRANSFER_INVALID_TYPE;
  public statusCode: number = 400;
  constructor(field: string) {
    super();
    this.message = field + this.message;
  }
}
