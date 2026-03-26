import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Card } from '../../services/card/card';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../component/navbar/navbar';
import { environment } from '../../../environments/environment';
import { CardProduct } from '../../services/card/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Api } from '../../services/api/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router"


@Component({
  selector: 'app-cardItems',
  imports: [CommonModule, Navbar, FontAwesomeModule],
  templateUrl: './cardItems.html',
  styleUrl: './cardItems.css',
})
export class CardItems implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private route: Router, private toastr: ToastrService) { }
  api = inject(Api)
  user: any = null
  ImgBaseUrl = environment.IMAGE_PATH
  cardService = inject(Card)
  cartItems: CardProduct[] = this.cardService.myCard()
  faLocationDot = faLocationDot

  ngOnInit(): void {
  }
  removeItem(uuid: any) {
    this.cardService.removeFromCard(uuid)
    this.cdr.detectChanges()
  }
  getTotal() {
    const total = this.cardService.myCard().reduce((acc, item: CardProduct | any) => {
      return acc + Number(item.price)
    }, 0)
    return total
  }
  checkOut() {
    if (!this.user || !this.user.email) {
      this.getUser()
    }
      this.getUser()
    if (this.user && this.user.username && this.user.email) {
      const carts = JSON.parse(localStorage.getItem('myCard') || '[]')
      if (carts && carts.length > 0 && this.user.id) {
        this.api.checkOut(carts).subscribe({
          next: () => {
            localStorage.removeItem('myCard') 
            this.toastr.success(`Your reservation request has been sent. You will be contacted via your email or phone number`, 'Reservation Successful', {
              timeOut: 4000,
              positionClass: 'toast-top-right',
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            });
            this.route.navigate(['/'])
          },
          error: (err:any) => {
            console.log(err)
            this.toastr.error('Please check your details and try again, or Contact Us.', 'Reservation failed', {
              timeOut: 6000,
              positionClass: 'toast-top-center',
              closeButton: true,
              progressBar: true,
              progressAnimation: "decreasing",
              tapToDismiss: false
            })
          }
        })
      }
    }
  }
  getUser() {
    this.api.getUser().subscribe({
      next: (resp: any) => {
        this.user = resp
      },
      error: (err: any) => {
        this.api.refreshToken().subscribe({
          next: () => this.getUser(),
          error: (err: any) => {
            this.toastr.error('Please log in before checking out.', 'Authentication Required', {
              timeOut: 6000,
              positionClass: 'toast-top-center',
              closeButton: true,
              progressBar: true,
              progressAnimation: "decreasing",
              tapToDismiss: false
            })
          }
        })
      }
    })
  }
}
