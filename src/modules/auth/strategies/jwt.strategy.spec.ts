import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    // Mock do process.env antes de instanciar
    process.env.SUPABASE_JWT_SECRET = 'test-secret';
    jwtStrategy = new JwtStrategy();
  });

  it('deve extrair e retornar os dados do payload corretamente', async () => {
    const payload = {
      sub: 'user-123',
      email: 'gaby@teste.com',
      role: 'admin',
      iat: 123456,
      exp: 789101,
    };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({
      userId: 'user-123',
      email: 'gaby@teste.com',
      role: 'admin',
    });
  });

  it('deve retornar undefined ou erro se o payload estiver vazio', async () => {
    const result = await jwtStrategy.validate({});
    expect(result.userId).toBeUndefined();
  });
});