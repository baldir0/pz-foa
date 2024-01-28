import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
} from 'class-validator';
import { UpdateProductInterface } from './../../../Interfaces/product-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class UpdateProductDTO implements UpdateProductInterface {
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  avalaibleStocks: number;

  @MaxLength(255, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  @IsUrl(
    {},
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_TYPE,
      },
    }
  )
  @IsOptional()
  imgSrc?: string;
}
