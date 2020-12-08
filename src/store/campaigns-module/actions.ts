/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CampaignsStateInterface } from './state';
import { ApiService, KampaignApiResponse } from '../api.service';
import { UpdateCampaignDto } from '../../entities/campaign.entity';

const actions: ActionTree<CampaignsStateInterface, StateInterface> = {
  async getAllCampaigns({ commit, rootState }): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.get('campaigns/', {}, rootState.users.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('setDisplayedCampaigns', responseData);
    }
    return kampaignApiResponse;
  },
  async createCampaign({ rootState, dispatch }, payload): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.post('campaigns/', { title: payload }, rootState.users.accessToken);
    const { responseStatus } = kampaignApiResponse;
    if (responseStatus) {
      await dispatch('getAllCampaigns');
    }
    return kampaignApiResponse;
  },
  async getCurrentCampaign({ rootState, commit }, payload: string): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.get(`campaigns/${payload}`, {}, rootState.users.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('setCurrentCampaign', responseData);
    }
    return kampaignApiResponse;
  },
  async saveCampaign({ rootState, commit }): Promise<KampaignApiResponse|null> {
    if (!rootState.campaigns.currentCampaign) return null;
    const updateCampaignDto: UpdateCampaignDto = {
      title: rootState.campaigns.currentCampaign.title,
      html: rootState.campaigns.currentCampaign.html,
      subject: rootState.campaigns.currentCampaign.subject,
      senders: rootState.campaigns.currentCampaign.senderEmails.map((cse) => cse.sender.id)
    }
    const { id } = rootState.campaigns.currentCampaign
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.update(`campaigns/${id}`, updateCampaignDto, rootState.users.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('setCurrentCampaign', responseData);
    }
    return kampaignApiResponse;
  },
  async getAvailableSenders({ commit, rootState }): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.get('senders/', {}, rootState.users.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('setAvailableSenders', responseData);
    }
    return kampaignApiResponse;
  },
  async createSender({ rootState, commit }, payload): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.post('senders/', { email: payload }, rootState.users.accessToken);
    const { responseStatus, responseData } = kampaignApiResponse;
    if (responseStatus) {
      commit('addSender', responseData);
    }
    return kampaignApiResponse;
  },
  async deleteSender({ rootState, commit }, id: number): Promise<KampaignApiResponse> {
    const apiService = new ApiService();
    const kampaignApiResponse = await apiService.delete(`senders/${id}`, {}, rootState.users.accessToken);
    const { responseStatus } = kampaignApiResponse;
    if (responseStatus) {
      commit('removeSender', id);
    }
    return kampaignApiResponse;
  },
  async selectSender({ commit, dispatch }, id: number): Promise<KampaignApiResponse> {
    commit('addSenderToCurrentEmail', id);
    const kampaignApiResponse: Promise<KampaignApiResponse> = await dispatch('saveCampaign');
    return kampaignApiResponse;
  },
  async unselectSender({ commit, dispatch }, id: number): Promise<KampaignApiResponse> {
    commit('removeSenderEmail', id);
    const kampaignApiResponse: Promise<KampaignApiResponse> = await dispatch('saveCampaign');
    return kampaignApiResponse;
  },
};

export default actions;
