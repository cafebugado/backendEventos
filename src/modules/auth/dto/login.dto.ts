import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuario para gerar o token de teste',
    example: 'admin@eventos.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuario (nao e validada neste endpoint de teste)',
    example: '123456',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'ID opcional para usar no claim sub',
    example: 'dev-user-id',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Role opcional para o token',
    example: 'admin',
    enum: ['admin', 'organizer', 'user'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['admin', 'organizer', 'user'])
  role?: string;
}
