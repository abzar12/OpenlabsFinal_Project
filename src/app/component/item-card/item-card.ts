import { Component, OnInit, Input } from '@angular/core';
import { Api } from '../../services/api/api';
import { environment } from '../../../environments/environment.ts';
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
  imageBase = environment.IMAGE_PATH
  @Input () Items:any [] = []
  @Input () is_loading: boolean = true
 ngOnInit(): void {
   
 }
}
