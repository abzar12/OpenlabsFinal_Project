import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../component/navbar/navbar';
import { CommonModule } from '@angular/common';
import {Api} from "../../services/api/api"
interface ReserveRoomProps {
  uuid:string
  title:string,
  description:string,
  localization:string,
  price:number ,
  image: string

}
@Component({
  selector: 'app-reserve',
  imports: [CommonModule, Navbar],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})
export class Reserve implements OnInit {
  api = inject(Api)

  reservedRooms: ReserveRoomProps [] =[];
ngOnInit(): void {
  this.getReserved()
}
  getReserved(){
    this.api.getReservedRoom().subscribe({
      next: (resp:any)=>{
        this.getReserved = resp
        console.log("reserved Room:", resp)
      },
      error: (err:any)=>{
        console.log("Getting Reserved Room Error: ", err)
      }
    })
  }

}
