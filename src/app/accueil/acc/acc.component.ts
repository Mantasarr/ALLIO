import { Component, OnInit } from '@angular/core';

interface acc1 {
  image: string;
}

interface acc2 {
  image: string;
}

interface acc3 {
  image: string;
}

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrl: './acc.component.scss'
})
export class AccComponent implements OnInit {
  constructeur () {}

  ngOnInit(): void {}

  acc1: acc1 [] = [
    {
      image: "assets/site-ecommerce-restaurant-1.jpg"
    }]

  acc2: acc2[] = [
    {
      image: "assets/to.jpg"
    }
  ]

  acc3: acc3[] = [
    {
      image: "assets/pombistro-picto-bon-reduction.png"
    }
  ]


}
