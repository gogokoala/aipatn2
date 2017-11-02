import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SF1Service } from './sf1.service'
import { SF1RoutingModule } from './sf1-routing.module'

import { SearchResultComponent } from './search-result/search-result.component'
import { ComplexSearchComponent } from './complex-search/complex-search.component'
import { SimpleSearchComponent } from './simple-search/simple-search.component'
import { FullTextComponent } from './full-text/full-text.component'

@NgModule({
  imports:      [ CommonModule, SF1RoutingModule ],
  declarations: [ SearchResultComponent, ComplexSearchComponent, SimpleSearchComponent, FullTextComponent ],
  providers:    [ SF1Service ]
})

export class SF1Module {}
