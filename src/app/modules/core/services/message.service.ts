import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {

  public  message_emitter: EventEmitter<Object>
  
  constructor() {
    this.message_emitter = new EventEmitter();
  }
  
 
  public showMessage(tipo,message){
     if(tipo == 'exito'){
        this.showMessageSuccess(message);
     }
     else if(tipo == 'error'){
       this.showMessageDanger(message);
     }
     else{
       this.showMessageWarning(message);
     }

  }

  showMessageWarning(message){
    let msg:{class:string, text:string}={class:'alert-warning',text:message};
    this.message_emitter.emit(msg);
  }

  showMessageDanger(message){
    let msg:{class:string, text:string}={class:'alert-danger',text:message};
    this.message_emitter.emit(msg);
  }

  showMessageSuccess(message){
    let msg:{class:string, text:string}={class:'alert-success',text:message};
    this.message_emitter.emit(msg);
  }
 
  
}
