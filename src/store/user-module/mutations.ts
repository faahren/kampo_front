import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';
import { User } from '../../entities/user.entity';

const mutation: MutationTree<UserStateInterface> = {
  updateUserAndToken (state: UserStateInterface, payload: { accessToken: string, user: User}) {
    state.accessToken = payload.accessToken;
    state.user = payload.user;
    console.log(payload);
  },
  updateUser(state: UserStateInterface, payload: User) {
    state.user = payload;
  }
};

export default mutation;
