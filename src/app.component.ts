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

  public menuPreview;

  async getMenuPreview() {
    const res = await fetch('http://localhost:3345/menu');
    this.menuPreview = await res.json();
    return this.menuPreview;
  }

  public handleSidebar() {
    const check = document.querySelector('#chk') as HTMLInputElement;
    const bg = document.querySelector('.bg') as HTMLInputElement;
    const menuHeader = document.querySelector(
      '.menu-header'
    ) as HTMLInputElement;
    const icon = document.querySelector('.menu-icon') as HTMLInputElement;
    const sidebar = document.querySelector('.side-menu') as HTMLInputElement;
    const iconSidebar = document.querySelector(
      '.icon-sidebar'
    ) as HTMLInputElement;
    const label = document.querySelector('.fa-bars') as HTMLInputElement;

    if (check.checked) {
      sidebar?.classList.add('side-menu-visible');
      iconSidebar?.classList.remove('icon-sidebar-visible');
      bg?.classList.add('bg-visible');
      menuHeader?.classList.add('menu-header-moved');
      icon?.classList.add('menu-icon-moved');
      label?.classList.add('fa-times');

      $(document).on('keyup', function (evt) {
        if (evt.keyCode == 27) {
          sidebar?.classList.remove('side-menu-visible');
          iconSidebar?.classList.add('icon-sidebar-visible');
          bg?.classList.remove('bg-visible');
          menuHeader?.classList.remove('menu-header-moved');
          icon?.classList.remove('menu-icon-moved');
          label?.classList.remove('fa-times');
          check.checked = false;
        }
      });

      bg.addEventListener('click', () => {
        sidebar?.classList.remove('side-menu-visible');
        iconSidebar?.classList.add('icon-sidebar-visible');
        bg?.classList.remove('bg-visible');
        menuHeader?.classList.remove('menu-header-moved');
        icon?.classList.remove('menu-icon-moved');
        label?.classList.remove('fa-times');
        check.checked = false;
      });
    }

    iconSidebar.onmouseover = () => {
      setTimeout(() => {
        sidebar?.classList.add('side-menu-visible');
        iconSidebar?.classList.remove('icon-sidebar-visible');
        bg?.classList.add('bg-visible');
        menuHeader?.classList.add('menu-header-moved');
        icon?.classList.add('menu-icon-moved');
        if (!check.checked) label?.classList.add('fa-times');
      }, 200);
    };

    sidebar.onmouseleave = () => {
      setTimeout(() => {
        sidebar?.classList.remove('side-menu-visible');
        iconSidebar?.classList.add('icon-sidebar-visible');
        bg?.classList.remove('bg-visible');
        menuHeader?.classList.remove('menu-header-moved');
        icon?.classList.remove('menu-icon-moved');
        label?.classList.remove('fa-times');
        check.checked = false;
      }, 300);
    };

    if (!check.checked) {
      sidebar?.classList.remove('side-menu-visible');
      iconSidebar?.classList.add('icon-sidebar-visible');
      bg?.classList.remove('bg-visible');
      menuHeader?.classList.remove('menu-header-moved');
      icon?.classList.remove('menu-icon-moved');
      label?.classList.remove('fa-times');
    }
  }

  ngOnInit() {
    // this.handleSidebar();
    this.getMenuPreview();
  }
}
