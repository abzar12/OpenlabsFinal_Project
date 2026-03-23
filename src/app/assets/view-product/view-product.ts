import { Component, OnInit, inject, ChangeDetectorRef, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Api } from '../../services/api/api';
import { Card } from '../../services/card/card';
import { Navbar } from '../../component/navbar/navbar';
import { CommonModule } from '@angular/common';
import { sign } from 'crypto';

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
  styleUrls: ['./view-product.css'],
})

export class ViewProduct implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  imageBase = environment.IMAGE_PATH
  cardService = inject(Card)
  api = inject(Api) // for the api services
  slug: any
  router = inject(ActivatedRoute)
  product: any = null;
  is_loading: boolean = false
  ngOnInit(): void {
    this.viewProduct()
  }
  viewProduct() {
    this.is_loading = true
    this.slug = this.router.snapshot.paramMap.get('slug')
    console.log("snapshot SLUG got:", this.slug)
    this.api.getProductBySlug(this.slug).subscribe({
      next: (resp: Products | any) => {
        this.product = resp
        console.log("this is response", resp)
        this.is_loading = false
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.log("Getting unique product Failed", err)
        this.is_loading = false
        this.cdr.detectChanges()
      }
    })
  }
  reservedRoom() {
    this.cardService.addToCard(this.product)
  }
  removeRoom(uuid: string) {
    this.cardService.removeFromCard(uuid)
  }
  isAdded = (uuid:any) => {
    return this.cardService.isAdded(uuid)
  }
}
