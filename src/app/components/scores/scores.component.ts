import { Component, OnInit, Input } from '@angular/core';
import { ComScoreService } from '../../services/com-score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  sugRelativeScore: number | undefined = undefined;
  relativeScore: number | undefined = undefined;
  @Input() sugICScore: number | undefined = undefined;
  icScore: number | undefined = undefined;
  @Input() sugRubricScore: number | undefined = undefined;
  rubricScore: number | undefined = undefined;
  @Input() sugOverallScore: number | undefined = undefined;
  overallScore: number | undefined = undefined;

  calcScore(relativeRatings: number, idealCompletion: number, rubrics: number): number {
    const score = Math.pow(Math.sqrt(relativeRatings) + Math.sqrt(idealCompletion) + Math.sqrt(rubrics), 2);
    const max_score = Math.pow(Math.sqrt(7) + Math.sqrt(7) + Math.sqrt(7), 2);

    return Math.round((score / max_score) * 7 * 100) / 100;
  }

  calcSugOverall(): number {
     return this.calcScore(
      this.sugRelativeScore || 0.0,
      this.sugICScore || 0.0,
      this.sugRubricScore || 0.0
    )
  }

  calcOverall(): void {
    this.overallScore = this.calcScore(
      this.relativeScore || 0.0,
      this.icScore || 0.0,
      this.rubricScore || 0.0
    )
  }

  constructor(private getRelativeScore: ComScoreService) { }

  ngOnInit(): void {
    this.getRelativeScore.data$.subscribe(data => {
      this.sugRelativeScore = data
    })
  }

}
