export type JwtConfig = {
  secret: string;
  expiresIn: string;
  issuer?: string;
  audience?: string;
};
