import { CreateRoleComponent } from './../create-role/create-role.component';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { RoleService } from './../../../services/security/role.service';
import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'kt-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

    searchForm : FormGroup;
	searchResultList: Array<any> ;
	onOperation:boolean = false;

	@ViewChild(ComponentHostDirective,{static:false})
	host: ComponentHostDirective ;

	constructor(
		private fb:FormBuilder,
		private cdr: ChangeDetectorRef,
		private roleService:RoleService,
		private creator: ComponentBase<CreateRoleComponent>) { }

	ngOnInit() {
		this.searchForm = this.fb.group({
			name:['']
		});
	}

	create(){
		this.onOperation = true;
		this.cdr.markForCheck();
		const comp = this.creator.Construct(CreateRoleComponent,this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
	}

	edit(id: number){
		this.onOperation = true;
		this.cdr.markForCheck();
		const comp = this.creator.Construct(CreateRoleComponent,this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.recordId.next(id);
    }

	search(){
		this.roleService.search(this.searchForm.value).subscribe({
			next:v => {
				if(v.successful){
					this.searchResultList = v.data;
					this.cdr.markForCheck();
				}
			}
		})
	}
}
