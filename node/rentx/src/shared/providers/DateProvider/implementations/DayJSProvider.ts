import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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

}