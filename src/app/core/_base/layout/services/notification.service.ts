import { Injectable } from '@angular/core';
import { defaultModules, ModuleEntry, notice, error, success, info } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import * as PNotifyFontAwesome5Fix from '@pnotify/font-awesome5-fix';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';

import Stack from '@pnotify/core/Stack';
import { flatMapDeep } from 'lodash';

defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5Fix, {});
defaultModules.set(PNotifyFontAwesome5, {});

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	labels = { close: 'بستن', stick: 'نمایش', unstick: 'حذف' }

	constructor() { }

	error(message: string) {
		error({
			title: "درخواست اشتباه",
			text: message,
			closer: true,
			sticker: true,
			delay: 3000,
			maxTextHeight: null,

			icon: 'fas fa-times fa-2x',
			stack: new Stack({
				dir1: 'down',
				dir2: 'right',
				firstpos1: 25,
				firstpos2: 25,
				modal: false,
				maxOpen: Infinity
			})
			,
		});
	}

	success(message: string) {
		success({
			title: "درخواست موفقانه اجرا گردید",
			text: message,
			closer: true,
			sticker: true,
			delay: 3000,
			labels: this.labels,
			maxTextHeight: null,
			icon: 'fas fa-check fa-2x',
			stack: new Stack({
				dir1: 'down',
				dir2: 'right',
				firstpos1: 25,
				firstpos2: 25
			})
		});
	}

	info(message: string) {
		info({
			title: "معلومات",
			text: message,
			closer: true,
			sticker: true,
			delay: 3000,
			maxTextHeight: null,
			labels: this.labels,
			icon: 'fas fa-info  fa-2x',
			stack: new Stack({
				dir1: 'down',
				dir2: 'right',
				firstpos1: 25,
				firstpos2: 25
			})
		});
	}

	notice(message: string) {
		notice({
			title: "اطلاعیه",
			text: message,
			closer: true,
			sticker: true,
			labels: this.labels,
			delay: 3000,
			maxTextHeight: null,
			icon: 'fas fa-exclamation fa-2x',
			stack: new Stack({
				dir1: 'down',
				dir2: 'right',
				firstpos1: 25,
				firstpos2: 25
			})
		});
	}

	confirm(opts: { message: string, ok: (event: Event & { detail: any }) => any, cancel?: (event: Event & { detail: any }) => any }) {
		const confirmNotice = notice({
			title: "هشدار!",
			text: opts.message,
			stack: new Stack({
				dir1: 'down',
				dir2: 'right',
				firstpos1: 25,
				firstpos2: 25,
				modal: true,
				overlayClose: false
			}),
			modules: new Map([

				[PNotifyConfirm, {
					confirm: true,

				}] as ModuleEntry<typeof PNotifyConfirm>,
			])
		});

		confirmNotice.on('pnotify:confirm', opts.ok);
		confirmNotice.on('pnotify:cancel', opts.cancel);
	}
}
