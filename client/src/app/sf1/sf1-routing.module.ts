import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SF1ListComponent } from './sf1-list/sf1-list.component'
import { ComplexSearchComponent } from './complex-search/complex-search.component'
import { SimpleSearchComponent } from './simple-search/simple-search.component'
import { SF1DetailComponent } from './sf1-detail/sf1-detail.component'

const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full'},
  { path: 'simple', component: SimpleSearchComponent },
  { path: 'complex', component: ComplexSearchComponent },
  { path: 'list', component: SF1ListComponent },
  { path: 'detail', component: SF1DetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SF1RoutingModule {}
