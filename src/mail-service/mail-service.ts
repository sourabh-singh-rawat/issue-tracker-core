import SMTPTransport from "nodemailer/lib/smtp-transport";
import { WorkspaceInvitePayload } from "..";

export interface EmailMessage {
  title: string;
  html: string;
  text?: string;
}

export interface MailService {
  send(
    sender: string,
    receiver: string,
    message: EmailMessage,
  ): Promise<SMTPTransport.SentMessageInfo>;

  sendWorkspaceInvite(payload: WorkspaceInvitePayload): Promise<void>;
}
