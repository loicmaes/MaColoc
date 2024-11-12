export interface IMailBody {
  to: string;
  subject?: string;
  template: IMailTemplate;
  attachements?: IMailAttachement[];
}
export interface IMailTemplate {
  subject?: string;
  text: string;
  html: string;
  attachements?: IMailAttachement[];
}
export interface IMailAttachement {
  filename: string;
  path: string;
  contentType: string;
}
