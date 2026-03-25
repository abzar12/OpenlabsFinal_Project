import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Api } from '../../../services/api/api';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {

  constructor(private location: Location, private http: HttpClient, private route: Router,
    private cdr: ChangeDetectorRef, private toastr: ToastrService) { }
  api = inject(Api)
  message: any
  error: any
  User = {
    email: '',
    password: ''
  }
  ngOnInit(): void {

  }
  LoginFn(forms: any) {
    console.log(forms.value)
    this.api.logInUser(forms.value).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.message = resp.message
        this.error = {};
        this.toastr.success('You have been logged in successfully.', ' Success', {
          timeOut: 4000,
          positionClass: "toast-top-right",
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          tapToDismiss: false
        })
        setTimeout(() => {
          this.location.back()
        }, 1800);
        this.api.getUser()
        this.cdr.detectChanges()
      },
      error: (err: any) => {
        this.error = err.message
        this.toastr.error('Incorrect Email or Password', 'Login Failed', {
          timeOut: 4000,
          positionClass: "toast-top-center",
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          tapToDismiss: false
        })
        this.cdr.detectChanges()
      }
    })
  }
}
