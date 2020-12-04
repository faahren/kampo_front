import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { CampaignsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const campaignsModule: Module<CampaignsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default campaignsModule;
