import { Component, OnInit, OnDestroy } from '@angular/core';

//Services
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit, OnDestroy {
  
  private message: any;
  private subscription_message: any;
  
  constructor(private message_service: MessageService) { }

  ngOnInit() {
    this.observerMessages();
  }


  ngOnDestroy(){
    this.subscription_message.unsubscribe();
  }

  observerMessages(){
    this.subscription_message = this.message_service.message_emitter.subscribe(
      (message) => this.message = message
    );
  }

}
