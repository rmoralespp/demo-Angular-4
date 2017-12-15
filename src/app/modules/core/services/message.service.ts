import { Injectable, EventEmitter } from '@angular/core';

import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class MessageService {

  public  message_emitter: EventEmitter<Object>
  private keepAfterNavigationChange = false;
  
  constructor(private router: Router) {
     this.message_emitter = new EventEmitter();
     
     this.router.events.subscribe((event)=>{
        if(event instanceof NavigationStart){
            if (this.keepAfterNavigationChange) {
                // only keep for a single location change
                this.keepAfterNavigationChange = false;
            } else {
                // clear alert
               this.clearMessage();
            }
        }
     })
  }
  
 
  public showMessage(tipo, message, keep_message = false){
     if(tipo == 'exito'){
        this.showMessageSuccess(message, keep_message);
     }
     else if(tipo == 'error'){
       this.showMessageDanger(message, keep_message);
     }
     else{
       this.showMessageWarning(message, keep_message);
     }
  }

  showMessageWarning(message, keep_message = false){
    this.keepAfterNavigationChange = keep_message;
    let msg:{class:string, text:string}={class:'alert-warning',text:message};
    this.message_emitter.emit(msg);
   
  }

  showMessageDanger(message,  keep_message = false){
    this.keepAfterNavigationChange = keep_message;
    let msg:{class:string, text:string}={class:'alert-danger',text:message};
    this.message_emitter.emit(msg);

  }

  showMessageSuccess(message,  keep_message = false){
    this.keepAfterNavigationChange = keep_message;
    let msg:{class:string, text:string}={class:'alert-success',text:message};
    this.message_emitter.emit(msg);
  
  }

  clearMessage(){
    this.message_emitter.emit(null);
  }
 
  
}
