import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJSProvider } from "./DateProvider/implementations/DayJSProvider";


export const TOKEN_DATE_PROVIDER = 'DateProvider';
container.registerSingleton<IDateProvider>(
	TOKEN_DATE_PROVIDER,
	DayJSProvider
)
