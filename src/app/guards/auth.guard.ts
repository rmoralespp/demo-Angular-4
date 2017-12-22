import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanDeactivate , ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';

import { MessageService } from '../modules/core/services/message.service';
import { AuthService } from '../modules/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanDeactivate<any> {

  constructor(
    private router: Router,
    private message_service: MessageService,
    private auth_service: AuthService
  ) { }

  canLoad(route: Route): boolean {
    const currenturl = `/${route.path}`;

    if (this.auth_service.user) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: currenturl }});
      return false;
    }
  }


  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean {
     return true;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let control = true;
    const current_url = state.url;

    if (!this.auth_service.user) {
      control = false;
      if (current_url == '/home' || current_url == '/users/list') {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: current_url }});
      } else {
        this.message_service.showMessageWarning('No esta autorizado para realizar esta accion');
      }
    }
    return control;

  }

}
