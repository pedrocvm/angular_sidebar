import { Component, OnInit, Input, Inject } from 'angular-ts-decorators';
import './sidebar.css';

@Component({
  selector: 'app-sidebar',
  template: require('./sidebar.html'),
})
export class SidebarComponent implements OnInit{
  public static $inject = [];

  @Input()
  public ezSubmenuList: any;


  public ngOnInit() {

  }
}
