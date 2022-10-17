import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentTypeService } from '../../services/document/document-type.service';
import { DocumentService } from '../../services/document/document.service';
import { UploadFileService } from '../../services/document/upload-file.service';
import { NotificationService } from './../../../../core/_base/layout/services/notification.service';

@Component({
	selector: 'kt-upload-file-modal',
	templateUrl: './upload-file-modal.component.html',
	styleUrls: ['./upload-file-modal.component.scss']
})
export class UploadFileModalComponent implements OnInit {

	public documentForm: FormGroup;
	fileToUpload: File = null;
	filename: string = "";
	stringifiedData: any;
	public documentTypeList = [];
	public SearchList = [];

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private changeDetector: ChangeDetectorRef,
		private notification: NotificationService,
		private uploadService: UploadFileService,
		private documentType: DocumentTypeService,
		private documentService: DocumentService
	) {
		this.documentForm = formBuilder.group({
			file: ['', Validators.required],
			description: [''],
			documentNumber: [''],
			documentSource: [''],
			documentTypeId: ['', Validators.required]
		})
	}

	ngOnInit() {
		this.getDocumentTypeList();
		this.searchDocument();
	}


	submit() {

		const controls = this.documentForm.controls;
		/** check form */
		if (this.documentForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		const data = this.documentForm.value;
		data.sectionId = this.uploadService.getSectionId();
		data.recordId = this.uploadService.getRecordId();

		this.documentService.upload(this.fileToUpload, data).subscribe({
			next: val => {
				if (val) {
					if (val.type == 4) {
						this.SearchList = val.body.data;
						this.notification.success("موفقانه ثبت گردید!");
						this.documentForm.reset();
						this.changeDetector.markForCheck();
					}


				}
			}, error: err => {
				this.notification.error(err);
			}
		});

	}

	searchDocument() {
		const data = this.documentForm.value;;
		data.sectionId = this.uploadService.getSectionId();
		data.recordId = this.uploadService.getRecordId();
		this.documentService.search(this.documentForm.value)
			.subscribe({
				next: d => {
					if (d.successful) {
						this.SearchList = d.data;
						this.changeDetector.markForCheck();
					}
				},
				error: err => {
					this.notification.error(err);
				}
			});

	}

	download(id: number) {
		this.documentService.download(id);
	}

	delete(index, id) {
		this.notification.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				this.documentService.delete(id).subscribe({
					next: val => {
						if (val.data == true) {
							this.notification.success("موفقانه حذف گردید!");
							this.SearchList.splice(index, 1);
							this.changeDetector.markForCheck();
						}
					}, error: err => {
						this.notification.error(err);
					}
				});
			}
		})
	}
	// change to any from FileList
	handleFileInput(files: any) {
		this.fileToUpload = files.target.files.item(0);
		this.filename = this.fileToUpload.name;
	}


	// look section
	getDocumentTypeList() {
		this.documentType.getList({}).subscribe((res) => {
			this.documentTypeList = res.data;
			this.changeDetector.detectChanges();
		})
	}

	newRecord() {
		this.documentForm.reset();
		this.filename = "";
	}

	isControlHasError(controlName, type) {
		const control = this.documentForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
}
