import { Component, OnInit, Input } from '@angular/core';
import { Thread } from '../../models/Thread';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  @Input() threads: Thread[];

  constructor() {
    this.threads = []
   }

  ngOnInit(): void {
  }

}
