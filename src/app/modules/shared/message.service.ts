import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  public messages:Object []=[]
  public last_message:Object;
  constructor() { }
  
  public add(message:Object){
       this.messages.push(message);
       this.last_message=message;
      
    }
  
      
  clear(){
       this.messages.length = 0;
       this.last_message=null;
    }

}
