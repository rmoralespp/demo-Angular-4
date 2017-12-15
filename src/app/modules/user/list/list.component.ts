import { Component, OnInit, OnDestroy} from '@angular/core';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  
  private subscription_service_user:any;
  private users:Array<any>;

  constructor(private user_service:UserService) { }
  
  ngOnInit() {
    this.observerServiceUser();

  }
  ngOnDestroy(){
    this.subscription_service_user.unsubscribe();
  }

  observerServiceUser(){
   this.subscription_service_user = this.user_service.getUsers$().subscribe((users)=>{
       this.users = users;
   })
  }

  
  
  deleteUser(user){
    this.user_service.deleteUser(user);
  }

  toogleDelete(user){
    user.is_delete?user.is_delete = false:user.is_delete = true;


  }


}
