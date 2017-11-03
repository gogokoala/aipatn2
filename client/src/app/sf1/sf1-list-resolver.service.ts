import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { SF1Summary, SF1Service } from './sf1.service';

@Injectable()
export class CrisisDetailResolver implements Resolve<SF1Summary> {
  constructor(private service: SF1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SF1Summary> {
    let id = route.paramMap.get('id');

    return this.service.getCrisis(id).take(1).map(crisis => {
      if (crisis) {
        return crisis;
      } else { // id not found
        this.router.navigate(['/crisis-center']);
        return null;
      }
    });
  }
}
