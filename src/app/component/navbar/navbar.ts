import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api/api';
import { Card } from '../../services/card/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser,faCaretDown,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export interface UserProp {
  id: string,
  username: string,
  firstname: string,
  lastname: string,
  role: string,
  email: string,
  localization: string,
  phone: string
}
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(private cdr: ChangeDetectorRef){}
  cardService = inject(Card)
  // cardLength =this.cardService ? this.cardService?.cardLength(): 1
  Dropdown:boolean = false 
  faUser = faUser
  faCaretDown=faCaretDown
  cart =faShoppingCart
  api = inject(Api)// refer to card service for getting the number of item in localstorage
  user: UserProp | null = null
  ngOnInit(): void {
    this.getCurrentUser()
    console.log("navbar rendered")
  }
  getCurrentUser() {
    this.api.getUser().subscribe({
      next: (resp: any) => {
        this.user = resp
        this.cdr.detectChanges()
      },
      error: () => {
        this.api.refreshToken().subscribe({
          next: () => {
            this.getCurrentUser()
            this.cdr.detectChanges()
          },
          error: () => {
            this.api.logOut().subscribe(); // logout if refresh fails
            this.cdr.detectChanges()
          }
        })
      }
    })
  }
  OnpenDropdown(){
    this.Dropdown = !this.Dropdown
  }
  logOut(){
    this.api.logOut()
  }
}
