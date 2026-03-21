import { Component, inject } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../../services/api/api';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, CommonModule ,FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private http:HttpClient, private route:Router){}
  api = inject(Api)
  message:any = ''
  error:any = {}
  User = {
    username:'',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    localization: '',
    password: '',
    confirm_password: ''
  }

  RegistrationFn(formData:any){
    console.log(formData.value); 
    this.api.createUser(formData.value).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        this.message = resp.message
         this.error = {}; 
         setTimeout(() => {
          this.route.navigate(['/sign-in'])
         }, 1800);
      },
      error: (err:any) => {
        this.error = err.message
        console.log("Failed to create User", err)
      }
    })
  }
}
