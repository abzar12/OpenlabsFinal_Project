import { Component, OnInit, Input } from '@angular/core';
import { Api } from '../../services/api/api';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard implements OnInit {
  imageBase = environment.IMAGE_PATH
  @Input () Items:any [] = []
  @Input () is_loading: boolean = true
 ngOnInit(): void {
   
 }
}
