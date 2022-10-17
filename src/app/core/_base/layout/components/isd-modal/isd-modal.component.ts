import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core'
import { ModalConfig } from '../../../../_config/modal.config'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { size } from 'lodash'


@Component({
  selector: 'kt-isd-modal',
  templateUrl: './isd-modal.component.html',
  styleUrls: ['./isd-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class IsdModalComponent implements OnInit {

  @Input() public modalConfig: ModalConfig

  @ViewChild('modal') private modalContent: TemplateRef<IsdModalComponent>
  private modalRef: NgbModalRef

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open() {
    this.modalRef = this.modalService.open(this.modalContent, { size: this.modalConfig.size });
    return this.modalRef;
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
