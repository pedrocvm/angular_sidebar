import { IAugmentedJQuery } from 'angular';
import { Component, Inject, Input, ViewParent } from 'angular-ts-decorators';
import './ez-side-menu.css';

@Component({
  selector: 'ezSideMenu',
  template: require('./ez-side-menu.html'),
})
export class EzSideMenu {
  public static $inject = [];

  @Input()
  public ezSubmenuList: any;

  private runtime?: any;

  constructor(@Inject('$element') private $element: JQuery) {}

  public ngOnInit() {
    this.$element.on('click', this.open.bind(this));
  }

  public click(item) {
    this.runtime?.menuClick(item);
  }

  public open(event: JQuery.ClickEvent) {
    event.stopPropagation();
    let parentElement = <HTMLElement>event.currentTarget.parentElement!;
    for (let element of parentElement.querySelectorAll('ez-side-menu')!) {
      if (element === event.currentTarget) {
        const chevron = element.querySelector('.fa-chevron-down') as HTMLInputElement;
        chevron.classList.toggle('fa-chevron-up');
        if (!element.classList.contains('has-active')) {
          element.classList.toggle('active');
          
          if (
            parentElement.tagName === 'EZ-SIDE-MENU' &&
            parentElement.classList.contains('active')
          ) {
            parentElement.classList.add('has-active');
            parentElement.classList.remove('active');
          }
        }
      } else {
        element.classList.remove('active');
      }
      element.classList.remove('has-active');
    }
  }
}
