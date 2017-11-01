import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisListComponent } from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full'},
  { path: 'simple', component: CrisisListComponent },
  { path: 'complex', component: CrisisDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SF1RoutingModule {}
