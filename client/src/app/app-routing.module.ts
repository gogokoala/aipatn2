import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleComponent } from './simple/simple.component';
import { ComplexComponent } from './complex/complex.component';
import { PatentResultComponent } from './patent-result/patent-result.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/pat-simple', pathMatch: 'full' },
  { path: 'pat-simple',  component: SimpleComponent },
  { path: 'pat-complex', component: ComplexComponent },
  { path: 'pat-search',  component: PatentResultComponent },
  { path: 'callback', component: OAuth2CallbackComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
