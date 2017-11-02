import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'sf1', pathMatch: 'full' },
  { path: 'sf1', loadChildren: 'app/sf1/sf1.module#SF1Module' }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
