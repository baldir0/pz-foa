import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { NewProductInterface } from './../../../Interfaces/product-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class NewProductDTO implements NewProductInterface {
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsString({
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @MaxLength(64, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  name: string;

  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsString({
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @MaxLength(1024, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  description: string;

  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_TYPE,
      },
    }
  )
  @Max(99999999.99, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  price: number;

  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_TYPE,
      },
    }
  )
  @Max(99999, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  avalaibleStocks: number;
}
