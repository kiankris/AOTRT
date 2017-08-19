import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Will we get anything displayed';
  letterValue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  @Input() word: string = "";
  finalValues: any[] = [[], [], [], []];
  letters: string[] = ["", "", "", ""];
  map: string[];
  answer: string[] = [];

  public position(num: number): number {
    return num;
  }

  public setLetter(letter: string, position: number) {
    this.letters[position - 1] = letter;
    console.log("Parent has selected letter: " + letter, "at position", position)
    console.log(this.letters)
    this.eval(position, position * 3);
  }

  eval(position, c) {
    let arr = this.finalValues[position - 1];
    let letter = this.letters[position - 1];
    console.log("The letter is: " + letter)
    if (letter == null || letter.length == 0) {
      return
    }
    while (arr.length > 0) {
      arr.pop()
    }
    for (let i = 0; i < 4; i++) {
      arr.push(Number(letter.charCodeAt(0) - 64) + (c * i))
    }

    this.map = this.determineFinalValues();
    console.log(this.map);
    this.populateAnswer();
  }
  determineFinalValues() {
    let answers = [];
    for (let i = 0; i < 26; i++) {
      answers.push(-1);
    }

    for (let row of this.finalValues) {
      if (row != null && row.length > 0) {
        answers[row[0] - 1] = String.fromCharCode(row[0] + 64);
        this.helpers(answers, 1, row[0], String(row[0]), String.fromCharCode(row[0] + 64));
      }
    }
    return answers;
  }
  helpers(arr, col, val, str, combo) {
    if (col < 4) {
      for (let row of this.finalValues) {
        if (row.length > 0) {
          let newVal = (val + row[col] - 1) % 26;
          let newStr = str + " + " + row[col];
          let newCombo = combo + " + " + String.fromCharCode(row[0] + 64);
          console.log("newVal:", newVal);
          if (typeof arr[newVal] === "number" || arr[newVal].length > newStr.length) {
            arr[newVal] = newCombo;
            console.log(newStr, "=", val + row[col]);
          }
          this.helpers(arr, col + 1, val + row[col], newStr, newCombo);
        }
      }
    }
  }
  populateAnswer() {
    console.log("Populate answer: " + this.word)
    if (this.word !== null || this.word.length > 0) {
      let word = this.word.toUpperCase();
      this.answer = [];
      if (this.map != null) {
        for (let c of word) {
          this.answer.push(c + " : " + this.map[c.charCodeAt(0) - 65]);
        }
      }
    }
  }

  evalWord(event: any) {
    const pattern = /^[a-zA-Z]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    else {
      this.populateAnswer();
    }
  }
}
