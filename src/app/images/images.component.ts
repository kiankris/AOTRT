import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  imageURLs: any[] = [];


  constructor() { }

  ngOnInit() {
    let s;
    let l = 0;

    for (let i = 0; i < 26; i++) {
      s = String.fromCharCode(l++ + 65);
      this.imageURLs.push("assets/" + s + ".jpg");
    }
    console.log(JSON.stringify(this.imageURLs));
    console.log("Finished initializing images array")
  }

}
