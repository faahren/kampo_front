import { MutationTree } from 'vuex';
import { CampaignsStateInterface } from './state';
import { Campaign, CampaignSenderEmail } from '../../entities/campaign.entity';
import { Sender } from '../../entities/sender.entity';

const mutation: MutationTree<CampaignsStateInterface> = {
  setDisplayedCampaigns(state: CampaignsStateInterface, campaigns: Campaign[]){
    state.displayedCampaigns = campaigns;
  },
  setCurrentCampaign(state: CampaignsStateInterface, campaign: Campaign){
    state.currentCampaign = campaign;
  },
  updateCampaignHtml(state: CampaignsStateInterface, html: string){
    if (state.currentCampaign) state.currentCampaign.html = html;
  },
  setAvailableSenders(state: CampaignsStateInterface, senders: Sender[]){
    state.availableSenders = senders;
  },
  addSender(state: CampaignsStateInterface, sender: Sender){
    state.availableSenders.push(sender);
  },
  removeSender(state: CampaignsStateInterface, id: number){
    state.availableSenders = state.availableSenders.filter((x) => x.id !== id);
  },
  addSenderToCurrentEmail(state: CampaignsStateInterface, id:number){
    const sender = state.availableSenders.find((x) => x.id === id);
    if (!sender) return;
    state.currentCampaign?.senderEmails.push({
      id:null,
      sender,
      date_created: new Date(),
      status: false
    })
  },
  removeSenderEmail(state: CampaignsStateInterface, id:number){
    if (!state.currentCampaign) return;
    state.currentCampaign.senderEmails = state.currentCampaign?.senderEmails.filter((x) => x.sender.id !== id)
  }
};

export default mutation;
