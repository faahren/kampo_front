/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { ApiService, KampaignApiResponse } from '../api.service';
import { setCookie, deleteCookie } from '../../utils/utils';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async signin ({ commit }, payload): Promise<KampaignApiResponse> {
    const { email, password } = payload;
    const apiService = new ApiService();
    const kampainApiResponse = await apiService.post('auth/signin', { email, password });
    const { responseStatus, responseData } = kampainApiResponse;

    if (responseStatus) {
      commit('updateUserAndToken', responseData)
      setCookie('authToken', responseData.accessToken)
      return kampainApiResponse;
    }
    return kampainApiResponse;
  },
  async getMe({ commit }, token) {
    const apiService = new ApiService();
    const { responseStatus, responseData } = await apiService.get('auth/me', {}, token);
    if (!responseStatus) {
      return false;
    }
    responseData.accessToken = token;
    commit('updateUserAndToken', responseData);
    return true;
  },
  logout({ commit }) {
    deleteCookie('authToken');
    commit('updateUserAndToken', { user: null, accessToken: null });
  }
};

export default actions;
