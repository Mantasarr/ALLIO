import { Component, OnInit } from '@angular/core';

interface cards1 {
  image: string;
  btn: string;
}

interface cards2 {
  image: string;
  btn: string;
}

interface cards3 {
  image: string;
  btn: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards1: cards1 [] = [
    {
      image: "assets/Mention.png",
      btn: "warn",
    }
  ]

  cards2: cards2 [] = [
    {
      image: "assets/Product.png",
      btn: "primary",
    }
  ]

  cards3: cards3 [] = [
    {
      image: "assets/Sales.png",
      btn: "accent",
    }
  ]

}
