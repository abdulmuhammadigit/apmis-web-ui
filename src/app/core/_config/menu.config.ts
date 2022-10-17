export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'مدیریت اجناس',
					root: true,
					alignment: 'left',
					toggle: 'click',
					icon: 'flaticon-interface-3',
					submenu: [
						{
							title: 'مدیریت جنس',
							root: true,
							bullet: 'dot',
							submenu: [
								{
									title: 'اجناس',
									bullet: 'dot',
									page: '/asset/search-item',
									icon: '',
								},
								{
									title: 'مشخصات',
									bullet: 'dot',
									page: '/asset/search-attribute',
									icon: '',
								},
							],

						},

						{
							title: 'توحید چارت صرفیه ',
							root: true,
							bullet: 'dot',
							page: '/asset/search-chart',
							icon: ''
						},

						{
							title: 'فورم درخواستی  ',
							root: true,
							bullet: 'dot',
							page: '/asset/search-request-form',
							icon: ''
						},

						{
							title: 'راپور رسیدات',
							root: true,
							bullet: 'dot',
							page: '/asset/search-item-receipt',
							icon: '',

						},
						{
							title: 'تکت توریع تحویلخانه',
							root: true,
							bullet: 'dot',
							page: '/asset/search-fs-five',
							icon: '',

						},
						{
							title: ' فورم اعاده تحویلخانه',
							root: true,
							bullet: 'dot',
							page: '/asset/search-item-reallocation',
							icon: '',

						},
						{
							title: ' فورم لیلام اجناس',
							root: true,
							bullet: 'dot',
							page: '/asset/search-auction',
							icon: '',

						}
					]
				},
				{
					title: 'مدیریت کارمندان',
					root: true,
					toggle: 'click',
					bullet: 'dot',
					icon: '\n' +
						'flaticon-users',
					submenu: [
						{
							title: 'ثبت کارمندان',
							root: true,
							page: '/asset/search-employee-list'
						},
						{
							title: 'ثبت ادارات',
							root: true,
							page: '/asset/search-organization'
						},
						{
							title: 'ثبت معتمد تحویلخانه',
							root: true,
							page: '/asset/search-stock-keeper'
						},
					]
				},
				{
					title: 'تنظیمات کاربر',
					root: true,
					alignment: 'left',
					toggle: 'click',
					icon: 'flaticon-user-settings',
					submenu: [
						{
							title: 'حساب کاربری',
							page: '/user-management/users'
						},
						{
							title: 'حقوق',
							page: '/user-management/roles'
						}
					]
				},
				{
					title: ' گزارشات',
					root: true,
					alignment: 'left',
					toggle: 'click',
					icon: 'flaticon-user-settings',
					submenu: [
						{
							title: 'گزارش اجناس ',
							page: '/report/item-report'
						}
					]
				},
				// {
				// 	title: 'Process Tracking',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	icon: 'flaticon2-files-and-folders',
				// 	submenu: [
				// 		{
				// 			title: 'Work Flow',
				// 			page: '/process-tracking/search-work-flow'
				// 		},
				// 		{
				// 			title: 'Classification',
				// 			page: '/process-tracking/search-classification'
				// 		},
				// 		{
				// 			title: 'Stage',
				// 			page: '/process-tracking/search-stage'
				// 		}
				// 		,
				// 		{
				// 			title: 'Connection',
				// 			page: '/process-tracking/search-connection'
				// 		}
				// 	]
				// },
				// {
				// 	title: 'تنظیمات ',
				// 	root: true,
				// 	toggle: 'click',
				// 	bullet: 'dot',
				// 	icon: '\n' +
				// 		'flaticon-user-settings',
				// 	submenu: [
				// 		{
				// 			title: 'واحد',
				// 			root: true,
				// 			page: '/configuration/search-unit'
				// 		},
				// 		{
				// 			title: 'سال مالی',
				// 			root: true,
				// 			page: '/configuration/search-fiscal-year'
				// 		},
				// 	]
				// }

			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Assets',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/asset/item',
					bullet: 'dot',
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					page: '/setting/search-employee',
				}

			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
