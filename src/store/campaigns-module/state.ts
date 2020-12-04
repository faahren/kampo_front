import { Campaign } from '../../entities/campaign.entity';
import { Sender } from '../../entities/sender.entity';


export interface CampaignsStateInterface {
  displayedCampaigns: Campaign[],
  currentCampaign: Campaign | null,
  availableSenders: Sender[],
}

const state: CampaignsStateInterface = {
  displayedCampaigns: [],
  currentCampaign: null,
  availableSenders: []
};

export default state;
