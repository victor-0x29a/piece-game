export type response = {
  token: string;
  expiresIn: number;
};

export type decodedToken = {
  id: number;
  authLevel: number;
};
