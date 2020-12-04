import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CampaignsStateInterface } from './state';

const getters: GetterTree<CampaignsStateInterface, StateInterface> = {
  displayedCampaigns: state => state.displayedCampaigns,
  currentCampaign: state => state.currentCampaign,
  availableSenders: state => state.availableSenders,
};

export default getters;
