import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'support-component',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {

  constructor() { }
  repoUrl:string;
  imageUrl:string;
  ngOnInit() {
    this.repoUrl = 'https://www.laconstituante.fr';
    this.imageUrl = 'https://www.laconstituante.fr/img/laconstituante_square.png';
  }

}
