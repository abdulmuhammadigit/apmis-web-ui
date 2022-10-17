// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
};

export let BASE_AUTH_URL = 'http://localhost:8083';
export let BASE_API_URL = 'http://localhost:8083';
export let LOGIN_PATH = '/api/auth/';
export let USER_OPERATION = '/api/user/';
export let ROLE_OPERATION = '/api/security/role/';
export let NECESSITY_CHART_OPERATION = '/api/necessitychart/';
export let NECESSITY_CHART_DETAIL_OPERATION = '/api/necessitychartdetail/';
export let LOOK_LIST_OPERATION = '/api/look/list/';
export let ITEM_REQUEST_OPERATION = '/api/itemrequest/';
export let ITEM_OPERATION = '/api/item/';
export let ITEM_RECEIPT_OPERATION = '/api/item-receipt/';
export let ITEM_RECEIPT_DETAIL_OPERATION = '/api/itemreceiptdetail/';
export let ITEM_DISTRIBUTION_OPERATION = '/api/itemdistribution/';
export let ITEM_ATTRIBUTE_OPERATION = '/api/itemattribute/';
export let EMPLOYEE_OPERATION = '/api/employee/';
export let ORG_UNIT_OPERATION = '/api/orgunit/';
export let STOCK_KEEPER_OPERATION = '/api/stockkeeper/';
export let ATTRIBUTE_OPERATION = '/api/attribute/';
export let ITEM_ATTRIBUTE_VALUE_OPERATION = '/api/itemattributevalue/';
export let ITEM_SPECIFICATION_OPERATION = '/api/itemspecification/';
export let ITEM_REQUEST_DETAIL_OPERATION = '/api/itemrequestdetail/';
export let ITEM_SUGGESTED_DETAIL_OPERATION = '/api/itemsuggesteddetail/';
export let ITEM_DETAIL_OPERATION = '/api/itemdetail/';
export let ITEM_DISTRIBUTION_DETAIL_OPERATION = '/api/itemdistributiondetail/';
export let ITEM_DISTRIBUTED_OPERATION = '/api/itemdistributed/';
export let UNIT_OPERATION = '/api/unit/';
export let FISCAL_YEAR_OPERATION = '/api/fiscalyear/';
export let UNIT_EXCHANGE_OPERATION = '/api/unitexchange/';
export let DONOR_OPERATION = '/api/donor/';
export let CATEGORY_OPERATION = '/api/category/';
export let DOCUMENT_OPERATION = '/api/document/';
export let DOCUMENT_TYPE_OPERATION = '/api/documenttype/';
export let PROPERTY_OPERATION = '/api/property/';
export let REPORT_LIST_OPERATION = '/api/report/list/';

export let ITEM_TRANSFER_OPERATION = '/api/stock/item-transfer/';


export let ITEM_REALLOCATION_OPERATION = '/api/itemreallocation/';
export let ITEM_REALLOCATION_DETAIL_OPERATION = '/api/itemreallocationdetail/';
export let AUCTION_OPERATION = '/api/auction/';
export let INSTITUTION = '/api/look/list/';
export let ITEM_REPORT_OPERATION = '/api/itemquantity/';
export let EMPLOYEE_REPORT_OPERATION = '/api/employeesitem/';
export let ITEM_ERCEIPT_REPORT_OPERATION = '/api/itemreceiptquantity/';

// process tracking
export let WORK_FLOW_OPERATION = '/api/workflow/';
export let ENTITY_OPERATION = '/api/entity/';
export let BUSINESS_RULE_OPERATION = '/api/businessrule/';
export let CONNECTION_OPERATION = '/api/connection/';
export let CLASSIFICATION_OPERATION = '/api/classification/';
export let HISTORY_OPERATION = '/api/history/';
export let STAGE_OPERATION = '/api/stage/';
export let STAGE_TYPE_OPERATION = '/api/stagetype/';

// Page Configuration
export let SIDE_MENU_OPERATION = '/api/side-menu/';
export let TOP_MENU_OPERATION = '/api/top-menu/';


export let PAGE_OPERATION = '/api/security/page/';
export let ROLE_PAGE_OPERATION = '/api/security/role-page/';
export let ROLE_PAGE_ENTITY_PERMISSION_OPERATION = '/api/security/role-page-permission/';

// Audit
export let AUDIT_OPERATION = '/api/audit/snapshots/';
export let SECURITY_ENTITY_OPERATION = '/api/security/entities/';

export const InjectableUrls: Array<any> = [
	{ provide: BASE_AUTH_URL, useValue: BASE_AUTH_URL },
	{ provide: BASE_API_URL, useValue: BASE_API_URL },
	{ provide: USER_OPERATION, useValue: USER_OPERATION },
	{ provide: LOGIN_PATH, useValue: LOGIN_PATH },
	{ provide: ROLE_OPERATION, useValue: ROLE_OPERATION },
	{ provide: NECESSITY_CHART_OPERATION, useValue: NECESSITY_CHART_OPERATION },
	{ provide: NECESSITY_CHART_DETAIL_OPERATION, useValue: NECESSITY_CHART_DETAIL_OPERATION },
	{ provide: LOOK_LIST_OPERATION, useValue: LOOK_LIST_OPERATION },
	{ provide: ITEM_REQUEST_OPERATION, useValue: ITEM_REQUEST_OPERATION },
	{ provide: ITEM_OPERATION, useValue: ITEM_OPERATION },
	{ provide: ITEM_RECEIPT_OPERATION, useValue: ITEM_RECEIPT_OPERATION },
	{ provide: ITEM_RECEIPT_DETAIL_OPERATION, useValue: ITEM_RECEIPT_DETAIL_OPERATION },
	{ provide: ITEM_DISTRIBUTION_OPERATION, useValue: ITEM_DISTRIBUTION_OPERATION },
	{ provide: ITEM_ATTRIBUTE_OPERATION, useValue: ITEM_ATTRIBUTE_OPERATION },
	{ provide: EMPLOYEE_OPERATION, useValue: EMPLOYEE_OPERATION },
	{ provide: ORG_UNIT_OPERATION, useValue: ORG_UNIT_OPERATION },
	{ provide: STOCK_KEEPER_OPERATION, useValue: STOCK_KEEPER_OPERATION },
	{ provide: ATTRIBUTE_OPERATION, useValue: ATTRIBUTE_OPERATION },
	{ provide: ITEM_ATTRIBUTE_VALUE_OPERATION, useValue: ITEM_ATTRIBUTE_VALUE_OPERATION },
	{ provide: ITEM_SPECIFICATION_OPERATION, useValue: ITEM_SPECIFICATION_OPERATION },
	{ provide: ITEM_REQUEST_DETAIL_OPERATION, useValue: ITEM_REQUEST_DETAIL_OPERATION },
	{ provide: ITEM_SUGGESTED_DETAIL_OPERATION, useValue: ITEM_SUGGESTED_DETAIL_OPERATION },
	{ provide: ITEM_DETAIL_OPERATION, useValue: ITEM_DETAIL_OPERATION },
	{ provide: ITEM_DISTRIBUTION_DETAIL_OPERATION, useValue: ITEM_DISTRIBUTION_DETAIL_OPERATION },
	{ provide: ITEM_DISTRIBUTED_OPERATION, useValue: ITEM_DISTRIBUTED_OPERATION },
	{ provide: ITEM_REPORT_OPERATION, useValue: ITEM_REPORT_OPERATION },
	{ provide: EMPLOYEE_REPORT_OPERATION, useValue: EMPLOYEE_REPORT_OPERATION },
	{ provide: DONOR_OPERATION, useValue: DONOR_OPERATION },
	{ provide: CATEGORY_OPERATION, useValue: CATEGORY_OPERATION },
	{ provide: DOCUMENT_OPERATION, useValue: DOCUMENT_OPERATION },
	{ provide: DOCUMENT_TYPE_OPERATION, useValue: DOCUMENT_TYPE_OPERATION },
	{ provide: PROPERTY_OPERATION, useValue: PROPERTY_OPERATION },
	{ provide: REPORT_LIST_OPERATION, useValue: REPORT_LIST_OPERATION },

	{ provide: ITEM_TRANSFER_OPERATION, useValue: ITEM_TRANSFER_OPERATION },

	{ provide: ITEM_ERCEIPT_REPORT_OPERATION, useValue: ITEM_ERCEIPT_REPORT_OPERATION },

	// process tracking
	{ provide: WORK_FLOW_OPERATION, useValue: WORK_FLOW_OPERATION },
	{ provide: ENTITY_OPERATION, useValue: ENTITY_OPERATION },
	{ provide: BUSINESS_RULE_OPERATION, useValue: BUSINESS_RULE_OPERATION },
	{ provide: CLASSIFICATION_OPERATION, useValue: CLASSIFICATION_OPERATION },
	{ provide: HISTORY_OPERATION, useValue: HISTORY_OPERATION },
	{ provide: STAGE_OPERATION, useValue: STAGE_OPERATION },
	{ provide: STAGE_TYPE_OPERATION, useValue: STAGE_TYPE_OPERATION },
	{ provide: CONNECTION_OPERATION, useValue: CONNECTION_OPERATION },
	{ provide: UNIT_OPERATION, useValue: UNIT_OPERATION },
	{ provide: FISCAL_YEAR_OPERATION, useValue: FISCAL_YEAR_OPERATION },
	{ provide: UNIT_EXCHANGE_OPERATION, useValue: UNIT_EXCHANGE_OPERATION },
	{ provide: ITEM_REALLOCATION_OPERATION, useValue: ITEM_REALLOCATION_OPERATION },
	{ provide: ITEM_REALLOCATION_DETAIL_OPERATION, useValue: ITEM_REALLOCATION_DETAIL_OPERATION },
	{ provide: AUCTION_OPERATION, useValue: AUCTION_OPERATION },

	// user managment
	{ provide: PAGE_OPERATION, useValue: PAGE_OPERATION },
	{ provide: ROLE_PAGE_OPERATION, useValue: ROLE_PAGE_OPERATION },
	{ provide: ROLE_PAGE_ENTITY_PERMISSION_OPERATION, useValue: ROLE_PAGE_ENTITY_PERMISSION_OPERATION },
	{ provide: INSTITUTION, useValue: INSTITUTION },

	{ provide: SIDE_MENU_OPERATION, useValue: SIDE_MENU_OPERATION },
	{ provide: TOP_MENU_OPERATION, useValue: TOP_MENU_OPERATION },
	{ provide: AUDIT_OPERATION, useValue: AUDIT_OPERATION },
	{ provide: SECURITY_ENTITY_OPERATION, useValue: SECURITY_ENTITY_OPERATION }

];


export const ModuleConstants = {
	Asset: 1,
	Configuration: 2,
	ProcessTracking: 3,
	Report: 4
}

export const SectionConstants = {
	ItemReceipt: 1,
	ItemRequest: 2,
	ItemDistribution: 3,
	ItemReallocation: 4,
	Auction: 5,
	NecessityChart: 6
}

export const ProcessEntity = {
	ItemRequest: "ITEM_REQUEST",
	NecessityChart: "NECESSITY_CHART",
	ItemReceipt: "ITEM_RECEIPT",
	ItemDistribution: "ITEM_DISTRIBUTION",
	Auction: "AUCTION",
	ItemReallocation: "ITEM_REALLOCATION"
}

export const StatusObjectName = {
	ItemReallocationDetail: "ItemReallocationDetail",
	ItemReallocationSpecification: "ItemReallocationSpecification"
}

export const StatusCategory = {
	ReallocationCategory: "R",
	ReallocationSpecification: "S"
}

export const StatusMapped = {
	ToEmployeeReallocation: 20
}
