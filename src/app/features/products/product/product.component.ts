import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {OrderService} from "../../../shared/services/order.service";
import {mergeMap, of} from "rxjs";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private orderService: OrderService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['id']) {
    //     this.productService.getProduct(+params['id'])
    //       .subscribe({
    //         next: (data) => {
    //           this.product = data;
    //         },
    //         error: (error) => {
    //           this.router.navigate(['/']);
    //         }
    //       });
    //   }
    // });

    this.activatedRoute.params.pipe(
      mergeMap(params => {
        if (params['id']) {
          return this.productService.getProduct(+params['id']);
        }
        return of(null);
      })
    ).subscribe({
      next: (data: any) => {
          this.product = data;
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  addToOrder(productName: string) {
    this.orderService.product = productName;
    this.router.navigate(['/order']);
  }
}
