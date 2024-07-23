import { Component, OnInit, Input } from '@angular/core';
import { Thread } from '../../models/Thread';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  @Input() content: Thread;

  labelClass: string = "";
  repliesID: string = 'replies-' + Math.random().toString(36).substring(2, 9);

  constructor() {
    this.content = new Thread;
   }

  ngOnInit(): void {
    const classMap = {
      "Minor issue": "text-bg-warning",
      "Major issue": "text-bg-danger",
      "Praise": "text-bg-success",
      "General": "text-bg-primary"
    };

    let key = this.content.severity as keyof typeof classMap;
    this.labelClass = classMap[key]
  }
}
