import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJSProvider } from "./DateProvider/implementations/DayJSProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";


export const TOKEN_DATE_PROVIDER = 'DateProvider';
container.registerSingleton<IDateProvider>(
	TOKEN_DATE_PROVIDER,
	DayJSProvider
)
export const TOKEN_MAIL_PROVIDER = 'MailProvider';
container.registerInstance<IMailProvider>(
	TOKEN_MAIL_PROVIDER,
	container.resolve(EtherealMailProvider)
)
export const TOKEN_STORAGE_PROVIDER = 'StorageProvider';
container.registerInstance<IStorageProvider>(
	TOKEN_STORAGE_PROVIDER,
	container.resolve(LocalStorageProvider)
)
