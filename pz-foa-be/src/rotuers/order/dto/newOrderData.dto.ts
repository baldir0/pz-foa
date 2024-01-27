import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';
import { AddProductToOrderInterface } from './../../../Interfaces/productOrder-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class NewOrderDataDTO implements AddProductToOrderInterface {
  @IsUUID('4', {
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
    each: true,
  })
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
    each: true,
  })
  productId: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_TYPE,
      },
      each: true,
    }
  )
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
    each: true,
  })
  amount: number;
}
