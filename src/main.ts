import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Capacitor } from '@capacitor/core';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { APP_INITIALIZER } from '@angular/core';
import { SQLiteService } from './app/services/sqlite.service';
import { DataBaseService } from './app/services/data-base.service';
import { InitializeAppService } from './app/services/initialize.app.service';
import { AuthService } from './app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { APIClientService } from './app/services/apiclient.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

const platform = Capacitor.getPlatform();
if(platform === "web") {
  jeepSqlite(window);
  window.addEventListener('DOMContentLoaded', async () => {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
  });
}

export function initializeFactory(init: InitializeAppService) {
  return () => init.inicializarAplicacion();
}
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(IonicModule.forRoot({ innerHTMLTemplatesEnabled: true })),
    importProvidersFrom(HttpClientModule),
    InitializeAppService,
    SQLiteService,
    DataBaseService,
    AuthService,
    Storage,
    APIClientService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeFactory,
        deps: [InitializeAppService],
        multi: true
    },
    provideAnimations()
],
});
