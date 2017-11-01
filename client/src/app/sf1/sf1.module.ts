import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrisisListComponent } from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';
import { SF1Service } from './sf1.service';
import { SF1RoutingModule } from './sf1-routing.module';

@NgModule({
  imports:      [ CommonModule, SF1RoutingModule ],
  declarations: [ CrisisDetailComponent, CrisisListComponent ],
  providers:    [ SF1Service ]
})

export class SF1Module {}
