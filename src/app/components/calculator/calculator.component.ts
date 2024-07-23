import { Component, OnInit, Input } from '@angular/core';
import { Ratings } from '../../models/Ratings'
import { ComScoreService } from '../../services/com-score.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  trainerRatings = new Ratings;
  leadRatings: Ratings = new Ratings;
  suggestedScore: number | undefined = undefined;

  styleMap = {
    1: "rgb(228, 146, 138)",
    2: "rgb(232, 177, 141)",
    3: "rgb(238, 220, 146)",
    4: "rgb(232, 234, 140)",
    5: "rgb(196, 232, 139)",
    6: "rgb(153, 231, 179)",
    7: "rgb(153, 231, 227)"
  }

  getStyle(key: number | undefined): string {
    return this.styleMap[key as keyof typeof this.styleMap]
  }

  // Beginning of Harshit's code
  //-----------------------------------------------------------------
  expandValueComparison(valueString: string) {
    // Use a regular expression to find all uppercase letters and their corresponding values in the string
    // (e.g., ["A=5", "B=6", "C=7", "D=5"])
    var itemValues = valueString.match(/[A-Z]=\d+/g);
  
    // Create an object to store the values for each item
    var values = {A: 1, B: 1, C: 1, D: 1};
    // Loop through the itemValues array and add each item and its value to the object
    if (itemValues) {
      for (var i = 0; i < itemValues.length; i++) {
        var item = itemValues[i].charAt(0) as keyof typeof values;
        var value = parseInt(itemValues[i].slice(2));
        // Check if the item already exists in the values object (i.e., if a value has already been assigned to this item)
        /*if (values.hasOwnProperty(item)) {
          throw new Error("Value assigned to the same item more than once");
        }*/
        values[item] = value;
      }
    }
    //return JSON.stringify(values);
    // Get the items from the values object and sort them in alphabetical order
    var items = Object.keys(values).sort();
  
    var relationships = [];
    // Loop through all pairs of items in alphabetical order and compare their values
    for (var i = 0; i < items.length; i++) {
      for (var j = i + 1; j < items.length; j++) {
        // If the values are equal, add the relationship to the array (e.g., "A=D")
        if (values[items[i] as keyof typeof values] == values[items[j] as keyof typeof values]) {
          relationships.push(items[i] + "=" + items[j]);
          // If the value of the first item is less than the value of the second item, add the relationship to the array (e.g., "A<B")
        } else if (values[items[i] as keyof typeof values] < values[items[j] as keyof typeof values]) {
          relationships.push(items[i] + "<" + items[j]);
          // Otherwise, the relationship is ">" (e.g., "A>B")
        } else {
          relationships.push(items[i] + ">" + items[j]);
        }
      }
    }
    return relationships;
  }
  
  // Function to compute the percentage of comparisons that two cells have in common
  AGREEMENT_RATE(cell1: string, cell2: string) {
    var relationships1 = this.expandValueComparison(cell1);
    var relationships2 = this.expandValueComparison(cell2);
  
    // Check if the two cells have the same number of comparisons
    if (relationships1.length != relationships2.length) {
      throw new Error("Cells do not have the same number of comparisons");
    }
  
    var numInCommon = 0;
    // Loop through the comparisons in the first cell and check if they are also present in the second cell
    for (var i = 0; i < relationships1.length; i++) {
      if (relationships2.includes(relationships1[i])) {
        numInCommon++;
      } else if (relationships1[i].indexOf("=") !== -1) {
        numInCommon += 0.5;
      } else if (relationships2.includes(relationships1[i].replace(/[<>]/, "="))) {
        numInCommon += 0.5;
      }
    }
    
    /*console.log(relationships1.length, relationships1)
    console.log(relationships2.length, relationships2)
    console.log(numInCommon)*/
  
    return numInCommon / relationships1.length;
  }
  
  calculateAgreement(): void {
    const cell1 = `A=${this.trainerRatings.A} B=${this.trainerRatings.B} C=${this.trainerRatings.C} D=${this.trainerRatings.D}`;
    const cell2 = `A=${this.leadRatings.A} B=${this.leadRatings.B} C=${this.leadRatings.C} D=${this.leadRatings.D}`;
  
    const rating = this.AGREEMENT_RATE(cell1, cell2);
    // Calculate agreement rate
    const agreementRate = rating * 100;
  
    // document.getElementById('results').innerText = 'Agreement Rate: ' + agreementRate.toFixed(2) + '%';
    // Calculate alignment (1-7 scale) based on agreement rate
    let relativeRatings = agreementRate * (7 - 1) / 100 + 1;
    for (const [key, value] of Object.entries(this.trainerRatings)) {
      let k = key as keyof Ratings
      if ((value == 7 && this.leadRatings[k] != 7) || (value != 7 && this.leadRatings[k] == 7)) {
        relativeRatings -= 0.3
      }
    }
  
    /**/

    this.suggestedScore = relativeRatings;
    this.sendScore.sendData(this.suggestedScore)
  }

  //---------------------------------------------------------------------
  // End of Harshit's code

  constructor(private sendScore: ComScoreService) { }

  ngOnInit(): void {
    
  }

}
