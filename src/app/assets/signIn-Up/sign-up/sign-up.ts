import { Component, inject } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../../services/api/api';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, CommonModule ,FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private http:HttpClient, private route:Router, private toastr: ToastrService){}
  api = inject(Api)
  message:any = ''
  error: any = ''
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
        this.error = {}
        this.toastr.success('Your account has been created successfully.', ' Success', {
          timeOut:4000,
          positionClass: "toast-top-right",
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          tapToDismiss: false
        })
         setTimeout(() => {
          this.route.navigate(['/sign-in'])
         }, 1800);
      },
      error: (err:any) => {
        this.error = 'Creating account failed', 'Sign-Up Failed'
        this.toastr.error('Creating account failed', 'Sign-Up Failed', {
          timeOut:4000,
          positionClass: "toast-top-center",
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          tapToDismiss: false
        })
      }
    })
  }
}
