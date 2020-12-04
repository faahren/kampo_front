import { Sender } from './sender.entity';

export class Campaign {
  id: number;
  title: string;
  date_created: Date;
  status: string;
  html: string;
  senderEmails: CampaignSenderEmail[];
  constructor(id: number, title: string, date_created: Date, status: string, html: string, senderEmails: CampaignSenderEmail[]) {
    this.id = id;
    this.title = title;
    this.date_created = date_created;
    this.status = status;
    this.senderEmails = senderEmails;
    this.html = html;
  }
}

export interface UpdateCampaignDto {
  title: string,
  html: string,
  senders: number[]
}

export interface CampaignSenderEmail {
  id: number | null,
  sender: Sender,
  date_created: Date,
  status: boolean,
}