import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from "ngx-owl-carousel-o"
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
    images = [
    {src: "/images/hero1.webp", alt: "Luxury hotel room for booking with king bed and modern interior design"},
    {src: "/images/hero2.webp", alt: "Affordable hotel room booking with comfortable bed and stylish decor"},
    {src: "/images/hero3.webp", alt: "Relax in a beautifully designed hotel room with premium comfort and city views"}
  ]
  ngOnInit(): void {
    
  }
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: true,
    navText: ['‹', '›'],
    responsive: {
      0: { items: 1 },
    }
  }

}
