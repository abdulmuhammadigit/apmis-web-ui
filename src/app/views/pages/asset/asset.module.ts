import { PrintItemReceiptComponent } from './item-receipt/print-item-receipt/print-item-receipt.component';
import { ControlItemReceiptComponent } from './item-receipt/control-item-receipt/control-item-receipt.component';
import { ViewItemReceiptComponent } from './item-receipt/view-item-receipt-for-cart/view-item-receipt.component';
import { PrintStockRecordedCartComponent } from './item-receipt/print-stock-recorded-cart/print-stock-recorded-cart.component';
import { ProcessTrackingModule } from './../process-tracking/process-tracking.module';
import { ItemAttributeValueComponent } from './item/item-attribute-value/item-attribute-value/item-attribute-value.component';
import { ItemAttributeComponent } from './item/itemAttribute/item-attribute/item-attribute.component';
import { SearchItemComponent } from './item/search-item/search-item.component';
import { SearchItemReallocationComponent } from './item-reallocation/search-item-reallocation/search-item-reallocation.component';
import { AddItemAtrributeValueComponent } from './item/item-attribute-value/add-item-atrribute-value/add-item-atrribute-value.component';
import { AddItemAtrributeComponent } from './item/itemAttribute/add-item-atrribute/add-item-atrribute.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { CreateItemReallocationComponent } from './item-reallocation/create-item-reallocation/create-item-reallocation.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetRoutingModule } from './asset-routing.module';
import { AssetComponent } from './asset.component';
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchAttributeComponent } from './item/search-attribute/search-attribute.component';
import { CreateAttributeComponent } from './item/create-attribute/create-attribute.component';
import { SearchItemReceiptComponent } from './item-receipt/search-item-receipt/search-item-receipt.component';
import { CreateItemReceiptComponent } from './item-receipt/create-item-receipt/create-item-receipt.component';
import { SearchItemDetailComponent } from './item/search-item-detail/search-item-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateFsFiveComponent } from './item-distribute/create-fs-five/create-fs-five.component';
import { SearchFsFiveComponent } from './item-distribute/search-fs-five/search-fs-five.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { CreateItemRequestComponent } from './item-request/create-item-request/create-item-request.component';
import { SearchItemRequestComponent } from './item-request/search-item-request/search-item-request.component';
import { CreateNecessityChartComponent } from './necessity-chart/create-necessity-chart/create-necessity-chart.component';
import { SearchNecessityChartComponent } from './necessity-chart/search-necessity-chart/search-necessity-chart.component';
import { ItemSpecificationComponent } from './item-receipt/item-specification/item-specification.component';
import { SearchItemRequestDetailComponent } from './item-request/search-item-request-detail/search-item-request-detail.component';
import { SearchItemReceiptSpecificationComponent } from './item-receipt/search-item-receipt-specification/search-item-receipt-specification.component';
import { CreateCommissionDecisionComponent } from './necessity-chart/commission-decision/create-commission-decision.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintModule } from 'ngx-print';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemExaminationComponent } from './item-reallocation/item-check/item-examination/item-examination.component';
import { ItemPricingComponent } from './item-reallocation/item-check/item-pricing/item-pricing.component';
import { ControlItemDistributionComponent } from './item-distribute/control-item-distribution/control-item-distribution.component';
import { PrintItemDistributeComponent } from './item-distribute/print-item-distribute/print-item-distribute.component';
import { PrintItemReallocationComponent } from './item-reallocation/print-item-reallocation/print-item-reallocation.component';
import { PrintItemRequestComponent } from './item-request/print-item-request/print-item-request.component';
import { PrintNecessityChartComponent } from './necessity-chart/print-necessity-chart/print-necessity-chart/print-necessity-chart.component';
import { CreateAuctionComponent } from './auction/create-auction/create-auction.component';
import { SearchAuctionComponent } from './auction/search-auction/search-auction.component';
import { SearchSaveTicketComponent } from './save-ticket/search-save-ticket/search-save-ticket.component';
import { SearchItemReceiptDetailComponent } from './item-receipt/search-item-receipt-detail/search-item-receipt-detail.component';
import { PropertyRegistrationComponent } from './property-registration/property-registration.component';
import { PrintAuctionComponent } from './auction/print-auction/print-auction/print-auction.component';
import { ItemReallocateSpecificationComponent } from './item-receipt/item-reallocate-specification/item-reallocate-specification.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from '../uploads/upload-file/upload-file.component';
import { UploadFileModalComponent } from '../uploads/upload-file-modal/upload-file-modal.component';
import { PrintPropertyRegistrationComponent } from './property-registration/print-property-registration/print-property-registration/print-property-registration.component';
import { AllocatedItemsComponent } from './necessity-chart/allocated-items/allocated-items.component';
import { SearchItemSpecificationComponent } from './item/search-item-specification/search-item-specification.component';
import { BoardDecissionComponent } from './auction/board-decission/board-decission.component';
import { SearchNecessityChartFormsComponent } from './necessity-chart/search-necessity-chart-forms/search-necessity-chart-forms.component';
import { ApproveItemDistributionComponent } from './item-distribute/approve-item-distribution/approve-item-distribution.component';
import { ControlItemRequestComponent } from './item-request/control-item-request/control-item-request.component';
import { SearchItemRemainComponent } from './item-request/search-item-remain/search-item-remain.component';
import { ModuleGuard } from '../../../core/auth';
import { CreateItemSuggestedComponent } from './item-suggested/create-item-suggested/create-item-suggested.component';
import { SearchItemSuggestedComponent } from './item-suggested/search-item-suggested/search-item-suggested.component';
import { PrintItemSuggestedComponent } from './item-suggested/print-item-suggested/print-item-suggested.component';
import { CreateItemTransferComponent } from './stock/item-transfer/create-item-transfer/create-item-transfer.component';
import { SearchItemTransferComponent } from './stock/item-transfer/search-item-transfer/search-item-transfer.component';
import { PrintItemTransferComponent } from './stock/item-transfer/print-item-transfer/print-item-transfer.component';
import { SaveItemDistributionDetailComponent } from './item-distribute/save-item-distribution-detail/save-item-distribution-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ItemRequestDetailsComponent } from './item-request/create-item-request/item-request-details/item-request-details.component';

@NgModule({
	declarations:
		[AssetComponent,
			SearchItemDetailComponent,
			SaveItemDistributionDetailComponent,
			SearchItemReceiptComponent,
			SearchAttributeComponent,
			CreateAttributeComponent,
			CreateItemReceiptComponent,
			CreateNecessityChartComponent,
			SearchNecessityChartComponent,
			CreateFsFiveComponent,
			SearchFsFiveComponent,
			CreateItemRequestComponent,
			SearchItemRequestComponent,
			ItemSpecificationComponent,
			SearchItemRequestDetailComponent,
			SearchItemReceiptSpecificationComponent,
			CreateItemReallocationComponent,
			SearchItemReallocationComponent,
			SearchItemComponent,
			CreateItemComponent,
			ItemAttributeComponent,
			AddItemAtrributeComponent,
			ItemAttributeValueComponent,
			AddItemAtrributeValueComponent,
			CreateCommissionDecisionComponent,
			ControlItemReceiptComponent,
			ViewItemReceiptComponent,
			PrintStockRecordedCartComponent,
			PrintItemReceiptComponent,
			ItemExaminationComponent,
			ItemPricingComponent,
			ControlItemDistributionComponent,
			PrintItemDistributeComponent,
			PrintItemReallocationComponent,
			PrintItemRequestComponent,
			PrintNecessityChartComponent,
			CreateAuctionComponent,
			SearchAuctionComponent,
			SearchSaveTicketComponent,
			SearchItemReceiptDetailComponent,
			PropertyRegistrationComponent,
			PrintPropertyRegistrationComponent,
			PrintAuctionComponent,
			ItemReallocateSpecificationComponent,
			AllocatedItemsComponent,
			SearchItemSpecificationComponent,
			BoardDecissionComponent,
			SearchNecessityChartFormsComponent,
			ApproveItemDistributionComponent,
			UploadFileComponent,
			UploadFileModalComponent,
			ControlItemRequestComponent,
			SearchItemRemainComponent,
			CreateItemSuggestedComponent,
			SearchItemSuggestedComponent,
			PrintItemSuggestedComponent,
			CreateItemTransferComponent,
			SearchItemTransferComponent,
			PrintItemTransferComponent,
			ItemRequestDetailsComponent,

		],
	entryComponents: [
		CreateAttributeComponent,
		SearchItemDetailComponent,
		CreateItemReceiptComponent,
		CreateFsFiveComponent,
		CreateNecessityChartComponent,
		CreateItemRequestComponent,
		ItemSpecificationComponent,
		CreateAttributeComponent,
		SaveItemDistributionDetailComponent,
		CreateFsFiveComponent,
		CreateItemReceiptComponent,
		CreateItemRequestComponent,
		SearchItemRequestComponent,
		SearchItemRequestDetailComponent,
		SearchItemReceiptSpecificationComponent,
		CreateItemReallocationComponent,
		CreateItemComponent,
		AddItemAtrributeComponent,
		AddItemAtrributeValueComponent,
		CreateCommissionDecisionComponent,
		ControlItemReceiptComponent,
		ViewItemReceiptComponent,
		PrintStockRecordedCartComponent,
		PrintItemReceiptComponent,
		ItemExaminationComponent,
		ItemPricingComponent,
		ControlItemDistributionComponent,
		PrintItemDistributeComponent,
		PrintItemReallocationComponent,
		SearchItemReceiptDetailComponent,
		PrintPropertyRegistrationComponent,
		PrintItemRequestComponent,
		PrintNecessityChartComponent,
		CreateAuctionComponent,
		SearchItemReceiptDetailComponent,
		PrintAuctionComponent,
		ItemReallocateSpecificationComponent,
		SearchItemSpecificationComponent,
		BoardDecissionComponent,
		AllocatedItemsComponent,
		ApproveItemDistributionComponent,
		UploadFileModalComponent
	],
	imports: [
		CommonModule,
		AssetRoutingModule,
		CoreModule,
		FormsModule,
		PartialsModule,
		NgbNavModule,
		PortletModule,
		ReactiveFormsModule,
		NgSelectModule,
		CKEditorModule,
		NgbModule,
		DpDatePickerModule,
		ProcessTrackingModule,
		NgxBarcodeModule,
		NgxPrintModule,
		NgxDatatableModule,
		NgxPaginationModule
	],
	exports: []
})
export class AssetModule { }
