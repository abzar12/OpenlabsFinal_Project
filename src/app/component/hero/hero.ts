import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from "ngx-owl-carousel-o"
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
    images = [
    {src: "/images/im1.jpg", alt: "room 1"},
    {src: "/images/img2.jpg", alt: "room 2"},
    {src: "/images/img3.jpg", alt: "room 3"}
  ]
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
