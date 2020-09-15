import 'angular-barcode';
import '../styles/builder.css';
import 'angular-busy';
import 'angular-busy/dist/angular-busy.css';
import 'angular-sanitize';
import 'gritter/css/jquery.gritter.css';
import 'gritter/js/jquery.gritter';
import 'ui-bootstrap4';

import { ITemplateCacheService, ILocationProvider } from 'angular';
import { NgModule } from 'angular-ts-decorators';
import { AppComponent } from './app.component';
import { EzSideMenu } from './ez-side-menu/ez-side-menu';

@NgModule({
  declarations: [AppComponent, EzSideMenu],
  id: 'AppModule',
  imports: [],
  providers: [],
})
export class AppModule {
  static config($locationProvider: ILocationProvider) {
    $locationProvider.html5Mode(true);
  }

  public static run($templateCache: ITemplateCacheService) {}
}

AppModule.config.$inject = ['$locationProvider'];
AppModule.run.$inject = ['$templateCache'];
