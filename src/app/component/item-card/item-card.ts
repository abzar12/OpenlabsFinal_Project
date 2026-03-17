import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  cardItems: any[] = [
    { Product: "room of three chamber color red at alajo ", Price: 8000, Url: "/images/img2.jpg" },
    { Product: "Room 2", Price: 8000, Promo_Price: 50000 ,Url: "/images/img2.jpg" },
    { Product: "Room 3", Price: 8000, Url: "/images/img2.jpg" },
    { Product: "Room 5", Price: 8000, Promo_Price: 0, Url: "/images/img2.jpg" },
    { Product: "Room 5", Price: 8000, Promo_Price: 50000, Url: "/images/img2.jpg" },
    { Product: "Room 6", Price: 8000,  Url: "/images/img2.jpg" },
     { Product: "Room 2", Price: 8000, Promo_Price: 50000 ,Url: "/images/img2.jpg" },
    { Product: "Room 3", Price: 8000, Url: "/images/img2.jpg" },
    { Product: "Room 5", Price: 8000, Promo_Price: 0, Url: "/images/img2.jpg" },
    { Product: "Room 5", Price: 8000, Promo_Price: 50000, Url: "/images/img2.jpg" }
  ]
}
