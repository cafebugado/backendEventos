import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin') 
@ApiBearerAuth() 
@Controller('admin')
export class AuthController {
  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retorna os dados do usuário logado via Supabase' })
  getMe(@GetUser() user: any) {
    return user;
  }
}