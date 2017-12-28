import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { MessageService } from '../../services/message.service';

import { trigger, animate, style, state, transition, keyframes} from '@angular/core';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  animations: [
    trigger('entryLeave', [
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 0.8}),
        ]))
    ]),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ]),
    ])
 ],
})

export class SectionComponent implements OnInit, OnDestroy {

  private message: any;
  private subscription_message: any;


  constructor(private message_service: MessageService) { }

  ngOnInit() {
    this.observerMessages();
  }


  ngOnDestroy() {
    this.subscription_message.unsubscribe();
  }

  observerMessages() {
    this.subscription_message = this.message_service.message_emitter.subscribe(
      (message) => {
        this.message = message;
      }

    );
  }

}
