import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Api } from '../../../services/api/api';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
constructor(private http:HttpClient, private route:Router, private cdr:  ChangeDetectorRef){}
api = inject(Api)
message:any
error:any
User= {
  email:'',
  password:''
}
  ngOnInit(): void {
    
  }
  LoginFn(forms:any){
    console.log(forms.value)
    this.api.logInUser(forms.value).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        this.message = resp.message
         this.error = {}; 
         setTimeout(() => {
          this.route.navigate(['/'])
         }, 1800);
         this.api.getUser()
         this.cdr.detectChanges()
      },
      error: (err:any) => {
        this.error = err.message
        console.log("Failed to create User", err)
         this.cdr.detectChanges()
      }
    })
  }
}
