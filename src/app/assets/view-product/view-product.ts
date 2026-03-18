import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Api } from '../../services/api/api';
import { Navbar } from '../../component/navbar/navbar';
import { CommonModule } from '@angular/common';

interface Products {
  id: number,
  uuid: string,
  slug: string,
  title: string,
  category: string,
  price: number,
  description: string,
  location: string,
  bathroom: string,
  bedroom: number,
  guest_number: number,
  images: string,
}
@Component({
  standalone: true,
  selector: 'app-view-product',
  imports: [CommonModule, Navbar],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css',
})

export class ViewProduct implements OnInit {
  imageBase = environment.IMAGE_PATH
  api = inject(Api)
  slug: any
  router = inject(ActivatedRoute)
  product: any = null;
  is_loading:boolean = false
  ngOnInit(): void {
    this.viewProduct()
  }
  viewProduct() {
    this.is_loading = true
    this.slug = this.router.snapshot.paramMap.get('slug')
    console.log(this.slug)
    this.api.getProductBySlug(this.slug).subscribe({
      next: (resp: any) => {
        this.product = resp
        console.log("this is response", resp)
      },
      error: (err) => {
        console.log("Getting unique product Failed", err)
      }
    }).add (() => {
      this.is_loading = false
    })
  }
}
