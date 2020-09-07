import { Component } from 'angular-ts-decorators';
import './sidebar.css';

@Component({
  selector: 'app-sidebar',
  template: require('./sidebar.html'),
})
export class SidebarComponent {
  public handleSidebar() {
    $('.sidebar-btn').click(() => {
      $('.wrapper').toggleClass('collapsed');
      $('.header').toggleClass('header-collapsed');
    });
  }

  public handleChevron() {
    const items = document.querySelectorAll('.item') as NodeListOf<Element>;
    items.forEach((item) => {
      $(item).click(() => {
        const chevron = item.querySelector('.fa-chevron-down');
        const submenu = item.querySelector('.sub-menu');
        chevron?.classList.toggle('fa-chevron-up');
        submenu?.classList.toggle('sub-menu-collapsed');
      });
    });
  }

  constructor() {}

  public ngOnInit() {
    this.handleSidebar();
    this.handleChevron();
  }
}
