import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../shared/services/order.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm = this.fb.group({
    name: ['', {
      validators: [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)],
    }],
    last_name: ['', {
      validators: [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)],
    }],
    phone: ['', {
      validators: [Validators.required, Validators.pattern(/^\+?(?:[0-9]{11})$/)],
    }],
    country: ['', {
      validators: [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)],
    }],
    zip: ['', {
      validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)],
    }],
    product: ['', {
      validators: [Validators.required],

    }],
    address: ['', {
      validators: [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я0-9\s\-\/]+$/)],
    }],
    comment: ['', {}]
  });

  get name() {
    return this.orderForm.get('name');
  }

  get lastName() {
    return this.orderForm.get('last_name');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get product() {
    return this.orderForm.get('product');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get comment() {
    return this.orderForm.get('comment');
  }

  constructor(private orderService: OrderService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    if (this.orderService.product) {
      this.orderForm.get('product')?.setValue(this.orderService.product);
    }
  }

  sendForm() {
    if (this.orderForm.valid) {
      this.orderService.sendForm(this.orderForm.value).subscribe({
          next: (data) => {
            if (data.success === 0) {
              document.getElementById('form-errors')!.style.display = 'block';
            } else {
              document.getElementById('form')!.style.display = 'none';
              document.getElementById('text')!.style.display = 'block';
            }
          }
        }
      );
    }
  }
}
