import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Navbar } from '../../component/navbar/navbar';
import { Hero } from '../../component/hero/hero';
import { ItemCard } from '../../component/item-card/item-card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Hero, ItemCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  filters = ["All", "Hotel", "Hostel", "Appartment"]
  filterValues: any[] = [{
    type: "All",
    page: 1,
    limit: 50
  }]
  filterClicked(filter:string){
    this.filterValues = [{...this.filterValues[0], type: filter}]
    console.log("filter clicked", this.filterValues)
  }
  
}
