import { UserDto } from "./user.dto";

export type TokenResponseDto = {
  accessToken: string;
  user: UserDto;
};
