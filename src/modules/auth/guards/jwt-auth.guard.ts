import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Acesso negado: Token ausente ou inválido');
    }
    return user;
    }
}