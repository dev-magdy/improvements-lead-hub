import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../../models/Reply';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input() content: Reply;

  constructor() {
    this.content = new Reply
   }

  ngOnInit(): void {
  }

}
