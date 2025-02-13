import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OrderListComponent } from './orders-list/orders-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersService } from './services/orders.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NewCustomerComponent } from './new-customers/new-customers.component';
import { AuthUserComponent } from './auth/auth-user/auth-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { AppRoutingModule } from './app-routing.module'; // Імпорт модуля маршрутизації

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
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule 
  ],
  providers: [OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
