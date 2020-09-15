import { OnInit } from './../jslib/angular-ts-decorators/types/lifecycle_hooks.d';
import angular, {
  IHttpResponse,
  ILocationService,
  IRootScopeService,
  ITimeoutService,
} from 'angular';
import { Component, Inject } from 'angular-ts-decorators';
import { IModalService, IModalSettings } from './uibootstrap4';

@Component({
  selector: 'appView',
  template: require('./app.component.html'),
})
export class AppComponent {
  public static $inject = [];

  public handleSidebar() {
    $('.sidebar-btn').click(() => {
      $('.wrapper').toggleClass('collapsed');
      $('.header').toggleClass('header-collapsed');
      $('.header .fa-bars').toggleClass('fa-times')
    });
  }

  public handleMenuCollapse() {
    const items = document.querySelectorAll('.item') as NodeListOf<Element>;

    items.forEach((item) => {
      const itemBtn = item.querySelector('.menu-btn');
      const chevron = item.querySelector('.fa-chevron-down');
      const submenu = item.querySelector('.sub-menu');
      const menuItems = item.querySelector('.menu-items');

      itemBtn?.addEventListener('click', ()=>{
        chevron?.classList.toggle('fa-chevron-up');
        submenu?.classList.toggle('sub-menu-collapsed');
        menuItems?.classList.toggle('menu-items-collapsed');
      })
      
    });
  }

  public handleSubmenuCollapse() {
    const submenus = document.querySelectorAll('.sub-menu') as NodeListOf<
      Element
    >;
    submenus.forEach((item) => {
      $(item).click(() => {
        const chevron = item.querySelector('.fa-chevron-down');
        const submenuItems = item.querySelector('.sub-menu-items');
        chevron?.classList.toggle('fa-chevron-up');
        submenuItems?.classList.toggle('sub-menu-items-collapsed');
      });
    });
  }

  public menuPreview = [
    {
      MenuGroup: 'HOME',
      Icon: 'fas fa-home',
      Items: [
        {
          Title: 'Dashboard',
          Home: true,
          $$hashKey: 'object:45',
        },
        {
          Title: 'Workflow',
          Workflow: true,
          $$hashKey: 'object:46',
        },
      ],
      $$hashKey: 'object:9',
    },
    {
      Id: 592,
      MenuGroup: 'ATTENDANCE',
      Icon: 'fas fa-users',
      Submenus: null,
      Items: [
        {
          FormId: 45496,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyTakeAttendance',
          Position: 0,
          Title: 'Event Attendance',
          $$hashKey: 'object:49',
        },
      ],
      Position: 3,
      $$hashKey: 'object:10',
    },
    {
      Id: 974,
      MenuGroup: 'REPORTS',
      Icon: 'far fa-calendar-alt',
      Submenus: [
        {
          Id: 972,
          MenuGroup: 'Monthly Register Report',
          Submenus: null,
          Items: [
            {
              FormId: 0,
              ExternalFormId: 0,
              ReportId: 607,
              Name: 'Register Reports',
              Position: 0,
              Title: 'Register Reports',
              $$hashKey: 'object:54',
            },
          ],
          Position: 1,
          $$hashKey: 'object:51',
        },
      ],
      Items: [],
      Position: 20,
      $$hashKey: 'object:11',
    },
    {
      Id: 586,
      MenuGroup: 'FINANCIALS',
      Icon: 'fas fa-money-check',
      Submenus: [
        {
          Id: 942,
          MenuGroup: 'Expenses',
          Submenus: null,
          Items: [
            {
              FormId: 45654,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'ExpenseCategories',
              Position: 0,
              Title: 'Expense Categories',
              $$hashKey: 'object:68',
            },
            {
              FormId: 48620,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Expense_Item_List',
              Position: 0,
              Title: 'Expense Item List',
              $$hashKey: 'object:69',
            },
            {
              FormId: 48541,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Expense_Sub_Categories',
              Position: 0,
              Title: 'Expense Sub Categories',
              $$hashKey: 'object:70',
            },
            {
              FormId: 45254,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Expenses',
              Position: 0,
              Title: 'Expenses',
              $$hashKey: 'object:71',
            },
          ],
          Position: 1,
          $$hashKey: 'object:56',
        },
        {
          Id: 941,
          MenuGroup: 'Revenue',
          Submenus: null,
          Items: [
            {
              FormId: 48542,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Revenue_Categories',
              Position: 0,
              Title: 'Revenue Categories',
              $$hashKey: 'object:76',
            },
            {
              FormId: 48543,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Revenue_Sub_Categories',
              Position: 0,
              Title: 'Revenue Sub Categories',
              $$hashKey: 'object:77',
            },
          ],
          Position: 2,
          $$hashKey: 'object:57',
        },
        {
          Id: 644,
          MenuGroup: 'By Department',
          Submenus: [
            {
              Id: 936,
              MenuGroup: 'Administration',
              Submenus: null,
              Items: [],
              Position: 1,
              $$hashKey: 'object:80',
            },
            {
              Id: 940,
              MenuGroup: 'Audio Visual',
              Submenus: null,
              Items: [],
              Position: 2,
              $$hashKey: 'object:81',
            },
            {
              Id: 939,
              MenuGroup: 'Children',
              Submenus: null,
              Items: [],
              Position: 3,
              $$hashKey: 'object:82',
            },
            {
              Id: 938,
              MenuGroup: 'Student Ministry',
              Submenus: [
                {
                  Id: 754,
                  MenuGroup: 'Ledger',
                  Submenus: null,
                  Items: [
                    {
                      FormId: 48741,
                      ExternalFormId: 0,
                      ReportId: 0,
                      Name: 'ExpenseTracker',
                      Position: 0,
                      Title: 'Expense Tracker',
                      $$hashKey: 'object:101',
                    },
                    {
                      FormId: 46106,
                      ExternalFormId: 0,
                      ReportId: 0,
                      Name: 'LYLedgerRevenue',
                      Position: 0,
                      Title: 'Revenue Ledger',
                      $$hashKey: 'object:102',
                    },
                  ],
                  Position: 2,
                  $$hashKey: 'object:95',
                },
                {
                  Id: 737,
                  MenuGroup: 'Draft Forecast',
                  Submenus: null,
                  Items: [
                    {
                      FormId: 46097,
                      ExternalFormId: 0,
                      ReportId: 0,
                      Name: 'DraftExpenseForecastSM',
                      Position: 0,
                      Title: 'Expense Forecast',
                      $$hashKey: 'object:105',
                    },
                    {
                      FormId: 46100,
                      ExternalFormId: 0,
                      ReportId: 0,
                      Name: 'DraftRevenueForecastSM',
                      Position: 0,
                      Title: 'Revenue Forecast',
                      $$hashKey: 'object:106',
                    },
                  ],
                  Position: 3,
                  $$hashKey: 'object:96',
                },
              ],
              Items: [],
              Position: 4,
              $$hashKey: 'object:83',
            },
            {
              Id: 937,
              MenuGroup: 'Young Adults',
              Submenus: null,
              Items: [
                {
                  FormId: 48784,
                  ExternalFormId: 0,
                  ReportId: 0,
                  Name: 'Young_Adult_Expense',
                  Position: 0,
                  Title: 'Young Adult Expense',
                  $$hashKey: 'object:109',
                },
              ],
              Position: 5,
              $$hashKey: 'object:84',
            },
          ],
          Items: [],
          Position: 3,
          $$hashKey: 'object:58',
        },
        {
          Id: 740,
          MenuGroup: 'Archived Forecast',
          Submenus: null,
          Items: [],
          Position: 4,
          $$hashKey: 'object:59',
        },
      ],
      Items: [],
      Position: 30,
      $$hashKey: 'object:12',
    },
    {
      Id: 585,
      MenuGroup: 'PEOPLE',
      Icon: 'fas fa-user',
      Submenus: null,
      Items: [
        {
          FormId: 45257,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyYouthCls',
          Position: 0,
          Title: 'People',
          $$hashKey: 'object:111',
        },
      ],
      Position: 40,
      $$hashKey: 'object:13',
    },
    {
      Id: 1217,
      MenuGroup: 'EVENTS',
      Icon: 'far fa-calendar-check',
      Submenus: null,
      Items: [
        {
          FormId: 45499,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyEventCalCls',
          Position: 0,
          Title: 'Calendar View',
          $$hashKey: 'object:113',
        },
        {
          FormId: 45273,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyEventsCls',
          Position: 0,
          Title: 'List View',
          $$hashKey: 'object:114',
        },
      ],
      Position: 50,
      $$hashKey: 'object:14',
    },
    {
      Id: 633,
      MenuGroup: 'FORMS',
      Icon: 'far fa-file-alt',
      Submenus: null,
      Items: [
        {
          FormId: 45505,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyBusResCls',
          Position: 0,
          Title: 'Bus Reservation',
          $$hashKey: 'object:117',
        },
        {
          FormId: 45400,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyExpReqAppCls',
          Position: 0,
          Title: 'Expense Reimbursement',
          $$hashKey: 'object:118',
        },
        {
          FormId: 45535,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyLiabilityFormCls',
          Position: 0,
          Title: 'Liability Release',
          $$hashKey: 'object:119',
        },
      ],
      Position: 60,
      $$hashKey: 'object:15',
    },
    {
      Id: 593,
      MenuGroup: 'TOOLS',
      Icon: 'fas fa-tools',
      Submenus: [
        {
          Id: 601,
          MenuGroup: 'Snack Shack',
          Submenus: null,
          Items: [
            {
              FormId: 48560,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Build_Inventory_Items',
              Position: 0,
              Title: 'Inventory',
              $$hashKey: 'object:140',
            },
            {
              FormId: 45309,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'LyCreateRegisterCls',
              Position: 0,
              Title: 'Register',
              $$hashKey: 'object:141',
            },
            {
              FormId: 48622,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'SnackShackSchedule',
              Position: 0,
              Title: 'Staff Schedule Calendar',
              $$hashKey: 'object:142',
            },
          ],
          Position: 1,
          $$hashKey: 'object:123',
        },
        {
          Id: 1279,
          MenuGroup: 'Storage',
          Submenus: null,
          Items: [
            {
              FormId: 49780,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Storage_Child_3',
              Position: 0,
              Title: 'Pictures',
              $$hashKey: 'object:146',
            },
            {
              FormId: 49779,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Storage_Child_2',
              Position: 0,
              Title: 'PowerPoint',
              $$hashKey: 'object:147',
            },
            {
              FormId: 49778,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Storage_Child_1',
              Position: 0,
              Title: 'Word | Excel | TXT',
              $$hashKey: 'object:148',
            },
          ],
          Position: 2,
          $$hashKey: 'object:124',
        },
        {
          Id: 1280,
          MenuGroup: 'Tracker',
          Submenus: null,
          Items: [
            {
              FormId: 48698,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'FundTrack',
              Position: 0,
              Title: 'FundTracker',
              $$hashKey: 'object:152',
            },
            {
              FormId: 45243,
              ExternalFormId: 0,
              ReportId: 0,
              Name: 'Trips',
              Position: 0,
              Title: 'TripTracker',
              $$hashKey: 'object:153',
            },
          ],
          Position: 3,
          $$hashKey: 'object:125',
        },
      ],
      Items: [
        {
          FormId: 48491,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'YouthBirthdays',
          Position: 0,
          Title: 'Birthdays',
          $$hashKey: 'object:132',
        },
        {
          FormId: 48934,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Checklist2ndGen',
          Position: 0,
          Title: 'Checklist',
          $$hashKey: 'object:133',
        },
        {
          FormId: 45403,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LySmallGroups',
          Position: 0,
          Title: 'Groups',
          $$hashKey: 'object:134',
        },
        {
          FormId: 48553,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyToDoList',
          Position: 0,
          Title: 'Task List',
          $$hashKey: 'object:135',
        },
      ],
      Position: 80,
      $$hashKey: 'object:16',
    },
    {
      Id: 584,
      MenuGroup: 'USER ACCOUNTS',
      Icon: 'fas fa-user-cog',
      Submenus: null,
      Items: [
        {
          FormId: 48785,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Facility',
          Position: 0,
          Title: 'Department',
          $$hashKey: 'object:156',
        },
        {
          FormId: 45242,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Role',
          Position: 0,
          Title: 'Permissions',
          $$hashKey: 'object:157',
        },
        {
          FormId: 45240,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'User',
          Position: 0,
          Title: 'User',
          $$hashKey: 'object:158',
        },
      ],
      Position: 90,
      $$hashKey: 'object:17',
    },
    {
      Id: 1014,
      MenuGroup: 'DEVELOPMENT',
      Icon: 'fas fa-code',
      Submenus: null,
      Items: [
        {
          FormId: 48908,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Dev_To_Dos',
          Position: 0,
          Title: "Dev To Do's",
          $$hashKey: 'object:162',
        },
      ],
      Position: 100,
      $$hashKey: 'object:18',
    },
    {
      Id: 587,
      MenuGroup: 'SETTINGS',
      Icon: 'fas fa-cog',
      Submenus: null,
      Items: [
        {
          FormId: 45655,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Accounts',
          Position: 0,
          Title: 'Accounts',
          $$hashKey: 'object:164',
        },
        {
          FormId: 49783,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Church_Roles',
          Position: 0,
          Title: 'Church Roles',
          $$hashKey: 'object:165',
        },
        {
          FormId: 48484,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'FloridaCities',
          Position: 0,
          Title: 'Cities',
          $$hashKey: 'object:166',
        },
        {
          FormId: 48792,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Department_People_Type',
          Position: 0,
          Title: 'Department People Type',
          $$hashKey: 'object:167',
        },
        {
          FormId: 48597,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Event_Name',
          Position: 0,
          Title: 'Event Name',
          $$hashKey: 'object:168',
        },
        {
          FormId: 45259,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LYEventTypesCls',
          Position: 0,
          Title: 'Event Types',
          $$hashKey: 'object:169',
        },
        {
          FormId: 49812,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'FundNameByYearChild',
          Position: 0,
          Title: 'Fund Name w/ Year',
          $$hashKey: 'object:170',
        },
        {
          FormId: 48697,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'List_of_Funds',
          Position: 0,
          Title: 'List of Funds',
          $$hashKey: 'object:171',
        },
        {
          FormId: 48627,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Medication_List',
          Position: 0,
          Title: 'Medication List',
          $$hashKey: 'object:172',
        },
        {
          FormId: 48599,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Parent_Connection',
          Position: 0,
          Title: 'Parent Connection',
          $$hashKey: 'object:173',
        },
        {
          FormId: 48790,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'People_Type',
          Position: 0,
          Title: 'People Type',
          $$hashKey: 'object:174',
        },
        {
          FormId: 48625,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Physician_Practice',
          Position: 0,
          Title: 'Physician Practice',
          $$hashKey: 'object:175',
        },
        {
          FormId: 45534,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyPickupDropoffCls',
          Position: 0,
          Title: 'Pick up/Drop off',
          $$hashKey: 'object:176',
        },
        {
          FormId: 45649,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'LyCashOut',
          Position: 0,
          Title: 'Sales Transaction',
          $$hashKey: 'object:177',
        },
        {
          FormId: 48581,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'States',
          Position: 0,
          Title: 'States',
          $$hashKey: 'object:178',
        },
        {
          FormId: 49913,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Storage_Folders',
          Position: 0,
          Title: 'Storage Folders',
          $$hashKey: 'object:179',
        },
        {
          FormId: 48552,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'StudentList',
          Position: 0,
          Title: 'StudentList',
          $$hashKey: 'object:180',
        },
        {
          FormId: 48556,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'TD_Task',
          Position: 0,
          Title: 'TD Task',
          $$hashKey: 'object:181',
        },
        {
          FormId: 48539,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'Test_DropdownDB_Filter',
          Position: 0,
          Title: 'Test DropdownDB Filter',
          $$hashKey: 'object:182',
        },
        {
          FormId: 49800,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'TripListByYearChild',
          Position: 0,
          Title: 'Trip Name w/ Year',
          $$hashKey: 'object:183',
        },
        {
          FormId: 48786,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'UserFacility',
          Position: 0,
          Title: 'User Department',
          $$hashKey: 'object:184',
        },
        {
          FormId: 48913,
          ExternalFormId: 0,
          ReportId: 0,
          Name: 'User_Interface_Name',
          Position: 0,
          Title: 'User Interface Name',
          $$hashKey: 'object:185',
        },
      ],
      Position: 110,
      $$hashKey: 'object:19',
    },
    {
      MenuGroup: 'PROFILE',
      Icon: 'fas fa-user-edit',
      Submenus: [],
      Items: [
        {
          Title: 'Change Password',
          ChangePassword: true,
          $$hashKey: 'object:208',
        },
        { Title: 'Logoff', Logoff: true, $$hashKey: 'object:209' },
      ],
      $$hashKey: 'object:20',
    },
  ];

  public ngOnInit() {
    this.handleSidebar();
  }
}