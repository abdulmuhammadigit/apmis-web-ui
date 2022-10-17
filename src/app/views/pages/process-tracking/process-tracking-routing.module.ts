import { ProcessTrackingMainComponent } from './process-tracking-main.component';
import { SearchConnectionComponent } from './connection/search-connection/search-connection.component';
import { SearchStageComponent } from './stage/search-stage/search-stage.component';
import { SearchClassificationComponent } from './classification/search-classification/search-classification.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchWorkFlowComponent } from './work-flow/search-work-flow/search-work-flow.component';

const routes: Routes = [
    { 
        path: '', 
        component: ProcessTrackingMainComponent ,
        children: [
            { path: 'search-work-flow', component: SearchWorkFlowComponent },
            { path: 'search-classification', component: SearchClassificationComponent },
            { path: 'search-stage', component: SearchStageComponent },
            { path: 'search-connection', component: SearchConnectionComponent }
        ]
    }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProcessTrackingRoutingModule { }
