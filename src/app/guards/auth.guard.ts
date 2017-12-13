import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';

import { MessageService } from '../modules/core/services/message.service';
import { AuthService }    from '../modules/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private message_service: MessageService,
    private auth_service: AuthService
  ) { }

  canLoad(route: Route ): boolean{
    let currenturl = `/${route.path}`;

    if(this.auth_service.user){
      return true
    }
    else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: currenturl }});
      return false;
    }
    
    
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let control:boolean = true
    let current_url = state.url
    
    if(!this.auth_service.user){ 
      control = false;
      if (current_url == '/home'){       
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: current_url }});     
      }
      else {
        this.message_service.showMessageWarning('No esta autorizado para realizar esta accion');       
      }
    }
    return control;
   
    
    
  }

}
