import { NotificationService } from './../../../../core/_base/layout/services/notification.service';
import { MenuAsideService } from './../../../../core/_base/layout/services/menu-aside.service';
// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';
import { StorageService } from '../../../../core/auth/_services/storage.service';
import * as cleaner from 'clean-deep';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'admin@demo.com',
	PASSWORD: 'demo'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;
	menuItems: any[];
	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private uAuth: AuthService,
		private storage: StorageService,
		private notifier: NotificationService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private asideService: MenuAsideService
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.notifier.info("معلومات ارائه شده ناقص و ناتکمیل است");
			return;
		}

		this.loading = true;

		const authData = {
			username: controls.username.value,
			password: controls.password.value
		};

		this.uAuth.login(authData.username, authData.password)
			.pipe(
				tap(data => {
					if (data.successful) {
						const user = data.data;
						if (user) {
							if (user.passwordExpired) {
								this.notifier.notice("لطفاً رمز خود را تغییر دهید");
								this.router.navigateByUrl('auth/change-password').then();
							} else {
								user.picture = './assets/media/users/default.jpg';
								this.storage.saveToken(user.token);
								this.storage.saveUser(user);
								this.notifier.success("کاربر محترم، به سیستم مدیریت اجناس، املاک و سرمایه خوش آمدید");
								this.uAuth.getUserModules({}).subscribe({
									next: async val => {
										const rawData = val.data;
										this.storage.setUserModules(cleaner.default(rawData));
										this.asideService.menuList$.next(this.storage.getUserModules());
										await this.router.navigateByUrl(this.returnUrl); // Main page
									},
									error: er => {
									}
								});
							}
						} else {
							this.notifier.notice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'))
						}
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe({
				error: (e) => {
					if (e.status && e.status == 401) {
						this.notifier.notice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'));
					} else if (e.message) {
						this.notifier.error(e.message);
					}
				}
			});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
