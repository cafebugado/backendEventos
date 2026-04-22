import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  @ApiOperation({ summary: 'Gera token JWT para testes' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Token JWT gerado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        token_type: 'Bearer',
        expires_in: '1d',
        user: {
          userId: 'dev-user-id',
          email: 'admin@eventos.com',
          role: 'admin',
        },
      },
    },
  })
  login(@Body() body: LoginDto) {
    const payload = {
      sub: body.userId ?? 'dev-user-id',
      email: body.email,
      role: body.role ?? 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: '1d',
      user: {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna os dados do usuário logado via Supabase' })
  getMe(@GetUser() user: JwtPayload): JwtPayload {
    return user;
  }
}
