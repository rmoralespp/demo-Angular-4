import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
 
  
})
export class NavComponent implements OnInit, OnDestroy, OnChanges {
  
  currentUser:any;
  subscription_user:any;

  constructor(
    private auth_service:AuthService,
  ) {}
  
  ngOnInit() { 
    this.observerUser();   
  }

  ngOnChanges() { }

 


  observerUser(){
    
    this.subscription_user = this.auth_service._user$.subscribe(
      user => {
        (user!=null)? this.currentUser = user: this.currentUser = undefined
      })
      
  }


  ngOnDestroy(){
      this.subscription_user.unsubscribe();
  }

  logout(){
    this.auth_service.logout();
  }

}
