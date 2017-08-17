import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  imageURLs: any[] = [];
  @Input() letters: string[] = ["", "", "", ""];
  map: string[];
  answer: string[];
  finalValues: any[] = [[], [], [], []];
  @Input() word: string;


  constructor() { }

  ngOnInit() {
    let s;
    let l = 0;
    let r1, r2;
    for (let k = 0; k < 2; k++) {
      r1 = [];
      for (let i = 0; i < 7; i++) {
        s = String.fromCharCode(l++ + 65);
        r1.push("assets/" + s + ".jpg");
      }
      r2 = [];
      for (let i = 0; i < 6; i++) {
        s = String.fromCharCode(l++ + 65);
        r2.push("assets/" + s + ".jpg");
      }
      this.imageURLs.push(r1);
      this.imageURLs.push(r2);
    }
    console.log("size: " + this.imageURLs.length);
    console.log("Finished initializing images array")
  }

  eval(position, c) {
    let arr = this.finalValues[position - 1];
    let letter = this.letters[position - 1];
    if (letter == null || letter.length == 0) {
      return
    }
    while (arr.length > 0) {
      arr.pop()
    }
    for (let i = 0; i < 4; i++) {
      arr.push(Number(letter) + (c * i))
    }

    this.map = this.determineFinalValues();
    this.populateAnswer();

  }

  determineFinalValues() {
    let answers = [];
    for (let i = 0; i < 26; i++) {
      answers.push(-1);
    }

    for (let row of this.finalValues) {
      if (row != null && row.length > 0) {
        answers[row[0] - 1] = String(row[0]);
        this.helpers(answers, 1, row[0], String(row[0]));
      }
    }
    return answers;
  }

  helpers(arr, col, val, str) {
    if (col < 4) {
      for (let row of this.finalValues) {
        if (row.length > 0) {
          let newVal = (val + row[col] - 1) % 26;
          let newStr = str + " + " + row[col];
          if (newVal) {
            if (typeof arr[newVal] === "number" || arr[newVal].length > newStr.length) {
              arr[newVal] = newStr;
              console.log(newStr, "=", val + row[col]);
            }
          }
          this.helpers(arr, col + 1, val + row[col], newStr);
        }
      }
    }
  }

  populateAnswer() {
    if (this.word != null || this.word.length > 0) {
      let word = this.word.toUpperCase();
      this.answer = [];
      if (this.map != null) {
        for (let c of word) {
          this.answer.push(c + " : " + this.map[c.charCodeAt(0) - 65]);
        }
      }
    }
  }
}
