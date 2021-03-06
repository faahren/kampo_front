import { Sender } from './sender.entity';

export class Campaign {
  id: number;
  title: string;
  date_created: Date;
  status: string;
  html: string;
  subject: string;
  senderEmails: CampaignSenderEmail[];
  constructor(
    id: number,
    title: string,
    date_created: Date,
    status: string,
    html: string,
    senderEmails: CampaignSenderEmail[],
    subject: string,
  ) {
    this.id = id;
    this.title = title;
    this.date_created = date_created;
    this.status = status;
    this.senderEmails = senderEmails;
    this.html = html;
    this.subject = subject;
  }
}

export interface UpdateCampaignDto {
  title: string;
  html: string;
  subject: string;
  senders: number[];
}

export interface CampaignSenderEmail {
  id: number | null;
  sender: Sender;
  date_created: Date;
  status: boolean;
}
