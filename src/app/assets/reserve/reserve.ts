import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../component/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Api } from "../../services/api/api";
import { Footer } from '../../component/footer/footer';
import { environment } from '../../../environments/environment.ts';
import { map, catchError, of } from 'rxjs';
interface ReserveRoomProps {
  id: string,
  order: {
    order_number: string,
    payment_status: string,
    order_status: string,
    reference: string,
    total_amount: string
  },
  room: {
    images: string,
    title: string,
    description: string,
    price: string
  },
  amount: string
}
@Component({
  selector: 'app-reserve',
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})
export class Reserve implements OnInit {
  api = inject(Api)
  imgBaseUrl = environment.IMAGE_PATH
  loading = true
  reservedRooms$ = this.api.getReservedRoom().pipe(
    map((resp: any) => resp ?? []), // pick the array from your API response
    catchError(() => of([]))             // fallback to empty array if error
  );
  ngOnInit(): void {
    this.reservedRooms$.subscribe(({
      next: (resp) => console.log("reserved Room list:", resp)
    }))
  }

}
