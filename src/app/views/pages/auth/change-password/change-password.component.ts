import { NotificationService } from './../../../../core/_base/layout/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/_services';
import { Router } from '@angular/router';

@Component({
	selector: 'kt-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	changePasswordForm: FormGroup;
	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private router: Router,
		private notifier: NotificationService
	) {
	}

	ngOnInit() {
		this.changePasswordForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			newPassword: ['', Validators.required]
		});
	}

	changePassword() {
		const controls = this.changePasswordForm.controls;
		/** check form */
		if (this.changePasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		this.auth.changePassword(this.changePasswordForm.value)
			.subscribe(next => {
				this.loading = false;
				if (next.successful) {
					if (next.data.success) {
						this.notifier.success("Password Changed Successfully!");
						this.router.navigateByUrl("auth/signin").then();
					}
				}
			});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.changePasswordForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
