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
    commit('updateUserAndToken', {accessToken: token, user: responseData});
    return true;
  },
  logout({ commit }) {
    deleteCookie('authToken');
    commit('updateUserAndToken', { user: null, accessToken: null });
  },
  async updateZohoCredentials({ commit, state }, payload): Promise<KampaignApiResponse>{
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.post('zoho', payload, state.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('updateUser', responseData);
    }
    return kampaignApiResponse;
  },
  async updateZohoAuth({ commit, state }, payload): Promise<KampaignApiResponse>{
    const code = payload;
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.post('zoho/auth', {code}, state.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('updateUser', responseData);
    }
    return kampaignApiResponse;
  }
};

export default actions;
