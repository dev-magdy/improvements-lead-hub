import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-schema',
  templateUrl: './review-schema.component.html',
  styleUrls: ['./review-schema.component.css']
})
export class ReviewSchemaComponent implements OnInit {

  declined: boolean = false;
  priority: boolean = false;
  ai: boolean = false;
  plagiarized: boolean = false;
  critiquIssues:boolean = false;

  flipCheck(varName: string): void {
    switch (varName) {
      case "declined":
        this.declined = !this.declined;
        break;
      case "priority":
        this.priority = !this.priority;
        break;
      case "ai":
        this.ai = !this.ai;
        break;
      case "plagiarized":
        this.plagiarized = !this.plagiarized;
        break;
      case "critiquIssues":
        this.critiquIssues = !this.critiquIssues;
        break;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
