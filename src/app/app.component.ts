import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  map = ['NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY', 'NOTREADY']
  @Input() word: string = "";
  finalValues: any[] = [[], [], [], []];
  letters: string[] = ["", "", "", ""];
  answer: string[] = [];
  answerAvailable = true;
  shift = 64;

  public test() {
    this.eval("R", 1, 3);
    this.eval("Q", 2, 6);
    this.eval("V", 3, 9);
    this.eval("Z", 4, 12);
  }
  public setLetter(letter: string, position: number) {
    this.letters[position - 1] = letter;
    // console.log("Parent has selected letter: " + letter, "at position", position, this.letters);
    this.eval(letter, position, position * 3);
  }

  eval(letter, position, c) {
    this.finalValues[position - 1] = [];
    let arr = this.finalValues[position - 1];

    let letterNumber = Number(letter.charCodeAt(0) - this.shift);
    // let str =
    // console.log("letterNumber:", letterNumber, String.fromCharCode(letterNumber + this.shift));
    for (let i = 0; i < 4; i++) {
      let calc = letterNumber + (c * i) + this.shift;
      let calcLetter = String.fromCharCode(letterNumber + (c * i) + this.shift);
      if (calc - this.shift > 25) {
        // console.log("Exceeded applicable value:", letterNumber + (c * i), "=", calc - this.shift, (calc - this.shift) % 26)
        calc = (calc - this.shift) % 26
        // console.log("Calculated:", calc);
        calcLetter = String.fromCharCode(calc + this.shift);
      }
      arr.push(letterNumber + (c * i));
    }
    // console.log(arr);

    this.map = this.determineFinalValues();
    // console.log(this.map);
    this.populateAnswer();
  }

  determineFinalValues() {
    let possibleAnswers = [];
    for (let i = 0; i < 26; i++) {
      possibleAnswers.push("NOTREADY");
    }
    // console.log("Calculating possible answers");

    for (let row of this.finalValues) {
      if (row != null && row.length > 0) {
        possibleAnswers[row[0] - 1] = String.fromCharCode(row[0] + this.shift);
        this.helpers(possibleAnswers, 1, row[0], String(row[0]), String.fromCharCode(row[0] + this.shift));
      }
    }
    return possibleAnswers;
  }

  convertNumbersToLetters(arr) {
    let str = "";
    let sum = 0;
    let i = 0;
    for (let x of arr) {
      str += String.fromCharCode(this.calculateSum(sum, x) + this.shift) + " "
      sum += x
      // console.log("Sum is", sum, "for", str);
    }
    return str
  }

  calculateSum(currentVal, newVal): number {
    let result = (currentVal + newVal) % 26;
    if (result == 0) {
      return 26;
    }
    return result;
  }

  helpers(arr, col, val, str, combo) {
    if (col < 4) {
      for (let row of this.finalValues) {
        if (row.length > 0) {
          let newVal = this.calculateSum(val, row[col]);
          let newStr = str + " + " + row[col];
          let newCombo = combo + " + " + String.fromCharCode(row[0] + this.shift);
          // console.log("Current Combo:", newCombo, newStr, newVal, val + row[col]);
          // console.log("newVal:", newVal);
          if (arr[newVal - 1] == "NOTREADY" || arr[newVal - 1].length > newStr.length) {
            arr[newVal - 1] = newCombo;
            // console.log(newVal - 1, "has been set to", newCombo);
          }
          this.helpers(arr, col + 1, val + row[col], newStr, newCombo);
        }
      }
    }
  }
  populateAnswer() {
    this.answer = []
    let word = this.word.toUpperCase();
    for (let c of word) {
      let position = c.charCodeAt(0) - (this.shift + 1)
      if (this.map[position] != "NOTREADY")
        this.answer.push(c + " : " + this.map[position]);
    }
  }

  evalWord() {
    const pattern = /^[a-zA-Z]+$/;
    // console.log(this.word, pattern.test(this.word))
    if (this.word.length == 0) {
      this.populateAnswer();
    }
    else if (pattern.test(this.word)) {
      // console.log("Word is:", this.word, ":", this.word.length, "action was allowed")
      this.populateAnswer();
    }
    else {
      // console.log("Word is:", this.word, ":", this.word.length, "action was prevented")
      this.word = this.word.substring(0, this.word.length - 1)
    }

  }
}
