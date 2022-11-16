import { Sample } from 'src/core/domain/model/sample';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from '@nestjs/class-validator';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from './dto-constants';

export class SampleDto implements Sample {
  @ApiProperty({
    title: 'name',
    description: 'Nome',
    type: 'string',
    readOnly: true,
    example: '609be72290ee94abbe416396',
  })
  @IsString()
  @MinLength(MIN_NAME_LENGTH)
  @MaxLength(MAX_NAME_LENGTH)
  name!: string;
}
