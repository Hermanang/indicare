import { Component } from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  msgs: Message[] = [];
  constructor(private messageService: MessageService) {}

  showSuccess() {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }
}
