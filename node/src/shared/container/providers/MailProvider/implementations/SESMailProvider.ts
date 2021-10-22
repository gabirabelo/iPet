import { injectable, inject } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";

import mailConfig from "@config/mail";

import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2012-10-17",
        region: "us-east-2",
      }),
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log({
      from: mailConfig.defaults.from.email,
      to: to.email,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    await this.client.sendMail({
      from: mailConfig.defaults.from.email,
      to: to.email,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
