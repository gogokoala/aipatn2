import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SearchResultComponent } from './search-result/search-result.component'
import { ComplexSearchComponent } from './complex-search/complex-search.component'
import { SimpleSearchComponent } from './simple-search/simple-search.component'
import { FullTextComponent } from './full-text/full-text.component'

const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full'},
  { path: 'simple', component: SimpleSearchComponent },
  { path: 'complex', component: ComplexSearchComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'fulltext', component: FullTextComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SF1RoutingModule {}
