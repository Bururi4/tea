import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductCardComponent} from "./components/product-card/product-card.component";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class SharedModule {
}
