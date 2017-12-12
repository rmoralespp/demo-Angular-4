import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import Local
import { MessageService } from '../../core/services/message.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  model: any = {};
  loading = false;
  returnUrl: string;
  message:any;
  next_url:any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private message_service:MessageService,
    private auth_service: AuthService
    
  
  ) {}

  ngOnInit() { 
    this.next_url = this.route.snapshot.queryParams['returnUrl'] || '/home' ;
    this.observerMessages();
  }

  login(){    
    this.loading = true;
    this.auth_service.login(this.model.username, this.model.password)
    .subscribe(
        data => {
           this.loading = false;
           this.message_service.showMessage('exito','Usuario logeado con exito');
           this.router.navigate([this.next_url]);
           this.auth_service.setCurrentUser(data);
        },
        error => {
            console.log(error);
            this.message_service.showMessage('error',error);
            this.loading = false;
        });
   
  }


  observerMessages(){
    this.message_service.message_emitter.subscribe(message=>{
      this.message=message;
    })
  }

}
