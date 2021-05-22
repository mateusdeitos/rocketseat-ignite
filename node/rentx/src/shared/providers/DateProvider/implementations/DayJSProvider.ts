import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo')

export class DayJSProvider implements IDateProvider {
	compareInHours(start_date: Date, end_date: Date): number {
		return dayjs(this.convertToUtc(start_date)).diff(this.convertToUtc(end_date), 'hours');
	}

	convertToUtc(date: Date): string {
		return dayjs(date).utc().local().format();
	}

	dateNow(): Date {
		return dayjs().toDate();
	}

	addDays(days: number): Date {
		return dayjs(this.dateNow()).add(days, 'days').toDate();
	}


}