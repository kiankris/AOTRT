import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  choice = "Select Symbol"

  imageURLs: any[] = [];
  @Output() letter: EventEmitter<string> = new EventEmitter<string>();
  display: boolean = false;
  isSelected: boolean = false;
  selectedImage: string;

  private _position;
  @Input() getPosition(): number {
    return this._position;
  }
  setPosition(val: number) {
    this._position = val;
  }
  constructor() { }

  ngOnInit() {
    let s;
    let l = 0;
    let r1, r2;
    for (let k = 0; k < 2; k++) {
      r1 = [];
      for (let i = 0; i < 7; i++) {
        s = String.fromCharCode(l++ + 65);
        // r1.push("assets/" + s + ".jpg");
        this.imageURLs.push("assets/" + s + ".jpg");
      }
      r2 = [];
      for (let i = 0; i < 6; i++) {
        s = String.fromCharCode(l++ + 65);
        // r2.push("assets/" + s + ".jpg");
        this.imageURLs.push("assets/" + s + ".jpg");
      }
      // this.imageURLs.push(r1);
      // this.imageURLs.push(r2);
    }
    console.log("size: " + this.imageURLs.length);
    console.log("Finished initializing images array", this.imageURLs);
  }

  changeDisplay() {
    this.display = !this.display;
  }

  selectLetter(image: string) {
    let choice = image.split("/")[1].charAt(0);
    console.log(choice);
    this.letter.emit(choice);
    this.choice = choice;
    // this.isSelected = true;
    // this.selectedImage = image;

    this.changeDisplay();
  }
}