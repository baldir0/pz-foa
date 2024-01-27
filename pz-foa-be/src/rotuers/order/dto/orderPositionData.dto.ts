import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { AddProductToOrderInterface } from '../../../Interfaces/productOrder-interface';
import { DataTransferErrorType } from '../../../utils/errors';

export class OrderPositionDataDTO implements AddProductToOrderInterface {
  @IsUUID('4', {
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  productId: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_TYPE,
      },
    }
  )
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  amount: number;
}
