import { Component, OnInit, inject } from '@angular/core';
import { Api } from '../../services/api/api';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard implements OnInit {
  api = inject(Api)
  imageBase = environment.IMAGE_PATH
  cardItems: any[] = [
  ]
  ngOnInit(): void {
    this.getAllRoom()
  }
  getAllRoom(){
    this.api.getProduct().subscribe({
      next: (resp: any) => {
        this.cardItems = resp
        console.log("all the available room:", resp)
      },
      error: (err:any) => {
        console.log("getting Room Failed :", err)
      }
    })
  }
}
