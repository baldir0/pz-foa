import { IsEmpty, IsUUID } from 'class-validator';
import { OrderDataInterface } from './../../../Interfaces/order-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class OrderDataDTO implements OrderDataInterface {
  @IsUUID('4', {
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @IsEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  userId: string;
}
