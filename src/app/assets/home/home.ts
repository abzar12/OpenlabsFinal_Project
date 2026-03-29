import { CommonModule } from '@angular/common';
import { OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { Navbar } from '../../component/navbar/navbar';
import { Hero } from '../../component/hero/hero';
import { ItemCard } from '../../component/item-card/item-card';
import { Api } from '../../services/api/api';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Hero, ItemCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  constructor( private cdr: ChangeDetectorRef){}
  loading = true
  api = inject(Api)
  cardItems: any [] = []
  // ------------filter ------
  filters = ["All", "hotel", "hostel", "serviced apartment", "guesthouse", 'resort']
  filterValues = {
    type: "All",
    page: 1,
    limit: 50
  }
  filterClicked(filter:string){
    this.filterValues.type = filter,
    this.filterValues.page = 1
    this.getAllRoom(this.filterValues)
  }

   ngOnInit(): void {
    this.getAllRoom(this.filterValues)
    console.log("home page rendered")
  }

  getAllRoom(filterValues:any) {
    this.loading = true
    this.api.getProduct(filterValues).subscribe({
      next: (resp: any) => {
        this.cardItems = resp || [];
        this.loading = false;
        // console.log("all the available room:", resp)
        this.cdr.detectChanges()
      },
      error: (err: any) => {
        console.log("getting Room Failed :", err)
        this.cardItems = [];
        this.loading = false;
        this.cdr.detectChanges()
      },
    })
  }
}
