import { User } from '../../entities/user.entity';

export interface UserStateInterface {
  user: User | null,
  accessToken: string | null,
}

const state: UserStateInterface = {
  user: null,
  accessToken: null,
};

export default state;
