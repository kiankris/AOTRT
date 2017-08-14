import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Will we get anything displayed';
  letterValue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  word = ""
  selectedLetter = "A"
  public checkType() {
    console.log(typeof (this.letterValue));
  }
  public getValue(val: string): number {
    let i = 0;
    for (let elem of this.letterValue) {
      i++;
      console.log(elem, val);
      if (elem == val) {
        return i;
      }
    }
  }
}
