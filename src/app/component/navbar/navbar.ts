import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api/api';
import { Card } from '../../services/card/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCaretDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { switchMap, catchError, tap, Observable } from 'rxjs';
import { of, throwError } from 'rxjs';

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
  private cdr = inject(ChangeDetectorRef);
  cardService = inject(Card)
  // cardLength =this.cardService ? this.cardService?.cardLength(): 1
  Dropdown: boolean = false
  faUser = faUser
  faCaretDown = faCaretDown
  cart = faShoppingCart
  api = inject(Api)// refer to card service for getting the number of item in localstorage
  user$:Observable< UserProp | any>  = this.api.getUser().pipe(
    catchError(() => this.api.refreshToken().pipe(
      switchMap(() => this.api.getUser()),
      catchError(() => {
        this.logOut();
        return of(null);
      })
    ))
  )
  ngOnInit(): void {
    console.log("navbar rendered", this.user$)

  }
  // getCurrentUser(retry = true) {
  //   this.api.getUser().pipe(
  //     tap((resp: any) => {
  //       this.user = resp
  //       console.log(resp)
  //       // this.cdr.detectChanges()
  //     }),
  //     catchError(err => {
  //       if (retry) {
  //         return this.api.refreshToken().pipe(
  //           switchMap(() => this.getCurrentUser(false)),
  //           catchError(() => {
  //             console.log('Refresh Failed');
  //             this.logOut();
  //             return of(null);
  //           })
  //         );
  //       } else {
  //         this.logOut();
  //       return of(null);
  //       }
  //     })
  //   ).subscribe
  // }
  OnpenDropdown() {
    this.Dropdown = !this.Dropdown
  }
  logOut() {
    this.api.logOut().subscribe({
      next: () => console.log('User logged out '),
      error: ()=> console.log('User logged out Failed'),
    })
  }
}
