import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private productService: ProductService, private router: Router) {
    $(document).ready(function () {
      $('.card-image').magnificPopup({
        type: 'image',
      });
    });
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            this.router.navigate(['/']);
            console.log(error);
          }
        }
      )
  }
}
