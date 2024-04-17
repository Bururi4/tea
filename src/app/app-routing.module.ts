import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./features/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)},
      {path: 'order', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)},
      {path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
