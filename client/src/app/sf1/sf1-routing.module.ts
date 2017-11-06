import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SF1ListComponent } from './sf1-list/sf1-list.component'
import { ComplexSearchComponent } from './complex-search/complex-search.component'
import { SimpleSearchComponent } from './simple-search/simple-search.component'
import { SF1DetailComponent } from './sf1-detail/sf1-detail.component'

import { SF1ListResolver } from './sf1-list-resolver.service'

const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full'},
  { path: 'simple', component: SimpleSearchComponent },
  { path: 'complex', component: ComplexSearchComponent },
  {
    path: 'list',
    component: SF1ListComponent,
    resolve: {
      crisis: SF1ListResolver
    }
  },
  {
    path: 'detail',
    component: SF1DetailComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SF1ListResolver
  ]
})

export class SF1RoutingModule {}
