import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-user/auth.guard';

import { AppComponent } from './app.component';
import { OrderListComponent } from './orders-list/orders-list.component';
import { NewOrderComponent } from './new-order/new-order.component'
import { OrdersService } from './orders-list/orders.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NewCustomerComponent } from './new-customers/new-customers.component';
import { AuthUserComponent } from './auth/auth-user/auth-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
    { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'new-order/:id', component: NewOrderComponent, canActivate: [AuthGuard] },
    { path: 'new-customer', component: NewCustomerComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterUserComponent },
    { path: 'login', component: AuthUserComponent},
  ];

@NgModule({
  declarations: [
    AppComponent, 
    OrderListComponent, 
    NewOrderComponent, 
    HeaderComponent, 
    HomeComponent, 
    CustomersComponent, 
    OrderDetailsComponent, 
    NewCustomerComponent,
    AuthUserComponent,
    RegisterUserComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes), FormsModule], 
  providers: [OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
