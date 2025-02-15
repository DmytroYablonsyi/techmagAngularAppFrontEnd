import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-user/auth.guard';
import { HomeComponent } from './product/product-list/products.component';
import { OrderListComponent } from './order/orders-list/orders-list.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { NewCustomerComponent } from './customer/new-customers/new-customers.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { AuthUserComponent } from './auth/auth-user/auth-user.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { EditProductsComponent } from './product/edit-products/edit-products.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'new-order/:id', component: NewOrderComponent, canActivate: [AuthGuard] },
  { path: 'new-customer', component: NewCustomerComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: AuthUserComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: EditProductsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
