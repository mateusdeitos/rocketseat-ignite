import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from "tsyringe";
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
export class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer.createTestAccount().then(account => {
			const transporter = nodemailer.createTransport({
				...account.smtp,
				auth: {
					user: account.user,
					pass: account.pass
				}
			})

			this.client = transporter;
		}).catch(error => console.log('Erro criando test-account', error))
	}

	async sendMail(to: string, subject: string, variables: Record<string, unknown>, path: string): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString('utf-8');
		const templateParse = handlebars.compile(templateFileContent);

		const templateHTML = templateParse(variables);

		const message = await this.client.sendMail({
			to,
			from: 'Rentx <noreply@rentx.com.br>',
			html: templateHTML,
		});

		console.log("Message sent: %s", message.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
	}

}