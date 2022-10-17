import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryService } from '../../../services/asset/look/category.service';

@Component({
  selector: 'kt-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss']
})
export class SearchCategoryComponent implements OnInit {

  searchCategoryForm: FormGroup;
  categorySearchList: Array<any>;

  onOperation: boolean = false;
  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;
  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private cdf: ChangeDetectorRef,
    private creator: ComponentBase<CreateCategoryComponent>,
    private notify: NotificationService,
  ) { }

  ngOnInit() {
    this.categorySearchList = [];

    this.searchCategoryForm = this.fb.group({
      id: [''],
      name: [''],
    })
  }

  editCategory(id) {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateCategoryComponent, this.host);
    comp.instance.result.subscribe(nex => {
      if (nex == 1) {
        this.searchCategory();
      }
      this.onOperation = false;
      comp.destroy()
    });
    comp.instance.id.next(id);
  }

  createCategory() {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateCategoryComponent, this.host);
    this.cdf.markForCheck();
    comp.instance.result.subscribe(nex => {
      this.onOperation = false;
      comp.destroy()
    });
  }

  searchCategory() {
    if (this.searchCategoryForm.valid) {
      this.service.search(this.searchCategoryForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.categorySearchList = d.data;
              if (d.data.length < 1) {
                this.notify.error("معلومات دریافت نگردید!");
              }
              this.cdf.markForCheck();
            }
          },
          error: err => {
            this.notify.error(err);
          }
        });
    }
  }

}
