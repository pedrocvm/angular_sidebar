import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import { platformBrowserDynamic } from "angular-ts-decorators";
import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule, { strictDi: true });
