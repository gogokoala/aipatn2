import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'

import { SF1Response, SF1Service } from './sf1.service'

@Injectable()
export class SF1ListResolver implements Resolve<SF1Response> {
  constructor(private service: SF1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SF1Response> {
    const searchConditions: string = route.queryParamMap.get('sc')

    return this.service.getList(searchConditions).map(res => {
      if (res) {
        return res
      } else { // id not found
        this.router.navigate(['/sf1/simple']);
        return null;
      }
    })
  }
}
