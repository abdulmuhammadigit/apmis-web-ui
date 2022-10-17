import { Injectable } from '@angular/core';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';

@Injectable({
	providedIn: 'root'
})
export class DatePickerService {

	public dateConfigShamsi = {
		locale: 'fa', format: 'jYYYY-jMM-jDD', monthFormat: "jMMMM , jYYYY", disableKeypress: false, showNearMonthDays: true, showMultipleYearsNavigation: false,

	};
	public dateConfigGregorian = { locale: 'en', format: 'YYYY-MM-DD', yearFormat: 'YYYY', disableKeypress: false, showNearMonthDays: true, showMultipleYearsNavigation: false };



	constructor() {

		jMoment.updateLocale('fa', {
			jMonths: ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'],
			jMonthsShort: ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'],
		});

	}

	match(date) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			return true;
		}
		return false;
	}

	toShamsiDate(date) {
		return jMoment(date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
	}

	toGregorianDate(shamsiDate) {
		return jMoment(shamsiDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
	}

	initCalendar() {
		const el = document.querySelectorAll('.dp-picker-input');
		el.forEach(element => {
			element.classList.add('form-control');
			element.classList.add('ng-pristine');
			element.classList.remove('dp-picker-input');
		});
	}
}
