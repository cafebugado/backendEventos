import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.SUPABASE_JWT_SECRET! || 'secret_de_fallback_para_dev',
      algorithms: ['HS256'],
    });
  }

  validate(payload: JwtPayload): UserPayload {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
