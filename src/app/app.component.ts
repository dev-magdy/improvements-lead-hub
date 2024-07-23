import { Component } from '@angular/core';
import { Thread } from "./models/Thread";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Reply } from './models/Reply';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'improvements-lead-hub';
  isDark: boolean = localStorage.getItem("theme") == "dark";

  toast = {
    style: "text-bg-success",
    message: "Copied successfully to clipboard!"
  };

  ratingThreads: Thread[] = [];
  icThreads: Thread[] = [];
  rubricThreads: Thread[] = [];
  otherThreads: Thread[] = [];

  drop(event: CdkDragDrop<Thread[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateScores()
    }
  }

  switchTheme(e: Event): void {
    this.isDark = (e.target as HTMLInputElement).checked;
    if (this.isDark) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem("theme", "light")
    }
  }

  copyJSON() {
    interface reducedComment { author: string; label: string; location: string; text: string; replies: Reply[]; }
    interface resultJSON {
      "IC Score": string | null | undefined,
      "Rubric Score": string | null | undefined,
      "Timestamp": number,
      "General": reducedComment[],
      "Major issue": reducedComment[],
      "Minor issue": reducedComment[],
      "Praise": reducedComment[]
    }

    let obj: resultJSON = { 
      "IC Score": document.getElementById("ic-score")?.getAttribute("value"),
      "Rubric Score": document.getElementById("rubric-score")?.getAttribute("value"),
      "Timestamp": Date.now(),
      "General": [],
      "Major issue": [],
      "Minor issue": [],
      "Praise": []
    };

    let comments = this.ratingThreads.concat(this.icThreads, this.rubricThreads, this.otherThreads);

    for (let c of comments) {
      const reduced = (({ severity, ...o }) => o)(c) // remove severity
      switch (c.severity) {
        case "General":
          obj.General.push(reduced);
          break;
        case "Major issue":
          obj["Major issue"].push(reduced);
          break;
        case "Minor issue":
          obj["Minor issue"].push(reduced);
          break;
        case "Praise":
          obj.Praise.push(reduced);
          break
      }
    }

    const jsonString = JSON.stringify(obj, null, 2); // Pretty print with 2 spaces
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample as Element);

    navigator.clipboard.writeText(jsonString).then(() => {
      console.log('JSON copied to clipboard');
      this.toast.style = "text-bg-success";
      this.toast.message = "Copied successfully to clipboard!";
      toastBootstrap.show()
    }).catch(err => {
      console.error('Failed to copy JSON to clipboard', err);
      this.toast.style = "text-bg-danger";
      this.toast.message = "Error copying data to clipboard!";
      toastBootstrap.show()
    });
  }

  calcScore(threads: Thread[]): number {
    let score = 7;

    for (let t of threads) {
      if (t.severity == "Major issue") {
        score -= 1
      } else if (t.severity == "Minor issue") {
        score -= 0.3
      }
    }

    return score
  }

  updateScores(): void {
    this.sugICScore = this.calcScore(this.icThreads);
    this.sugRubricScore = this.calcScore(this.rubricThreads)
  }

  sugICScore: number | undefined = undefined;
  sugRubricScore: number | undefined = undefined;

  extractComments(html: string): void {
    let el = document.getElementById("comments-html");

    if (el == null) {
      el = document.createElement("div");
      el.setAttribute("id", "comments-html");
      el.setAttribute("style", "display: none;")
    }

    el.innerHTML = html;

    var locators = {
      "threadsList": ".flex.border-slate-300",
      "threadSections": "gap-3",	// inside a thread
      "commentType": ".MuiChip-root",	// inside a section
      "commentLevel": "blockquote",	// inside a section
      "text": "div.whitespace-pre-wrap"	// inside a section
    };
    
    function getComment(div: Element) {
      let cType = div.querySelector(locators.commentType);
      let comment: Thread = new Thread;
      comment.author = div.getElementsByTagName("a")[0].innerText;
      if (cType) {
        comment.severity = cType.getAttribute("aria-label") || "";
        comment.label = cType.querySelector("span")?.innerText || "";
      }

      let cLevel = div.getElementsByTagName("blockquote");
      comment.location = cLevel.length ? cLevel[0].innerText : "root";
      comment.text = (div.querySelector(locators.text) as HTMLElement).innerText;
    
      return comment
    }
    
    function getReplies(divs: Element[]) {
      let replies: Reply[] = [];
      for (let div of divs) {
        replies.push({
          "author": div.getElementsByTagName("a")[0].innerText,
          "text": (div.querySelector(locators.text) as HTMLElement).innerText
        })
      }
    
      return replies
    }
    
    let threads = Array.from(el.querySelectorAll(locators.threadsList));
    
    for (let thread of threads) {
      let sections = Array.from(thread.getElementsByClassName(locators.threadSections));
      let comment = getComment(sections[0]);
      comment.replies = sections.length > 1 ? getReplies(sections.slice(1)) : [];
    
      // categorize comments
      if (comment.label.toLowerCase().includes("rubric") || comment.text.toLowerCase().includes("rubric")) {
        this.rubricThreads.push(comment)
      } else if (/Message \d+ - Completion [ABCD]/.test(comment.location)) {
        this.ratingThreads.push(comment)
      } else if (/Message \d+ - Ideal completion/.test(comment.location)) {
        this.icThreads.push(comment)
      } else {
        this.otherThreads.push(comment)
      }
    }
    
    this.ratingThreads.reverse();
    this.icThreads.reverse();
    this.rubricThreads.reverse();
    this.otherThreads.reverse();

    this.updateScores()
  }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-bs-theme', localStorage.getItem("theme") as string);
  }
}