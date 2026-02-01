import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit{
  message:string = ''
  type: 'success' | 'error' = 'success'
  visible = false

  constructor(private toastService:ToastService){ }

  ngOnInit(): void {
    this.toastService.toast$.subscribe(toast => {
      this.message = toast.message
      this.type= toast.type
      this.visible = true

      setTimeout(() => this.visible = false, 3000)
    })
  }

}
