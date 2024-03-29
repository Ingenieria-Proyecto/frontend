import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import {DataTablesModule} from 'angular-datatables';
import { MatCardModule } from '@angular/material/card';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartsModule } from 'ng2-charts';

//Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ListRatesComponent } from './components/list-rates/list-rates.component';
import { AddEditRateComponent } from './components/add-edit-rate/add-edit-rate.component';

import { ListParksComponent } from './components/park/list-parks/list-parks.component';
import { AddEditComponent } from './components/park/add-edit/add-edit.component';
import { FilterPipe } from './utils/filter.pipe';
import { ListRolesComponent } from './components/list-roles/list-roles.component';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { ListParkComponent } from './components/ticket/list-park/list-park.component';
import { AdministrativeListComponent } from './components/ticket/administrative-list/administrative-list.component';
import { ReservationModalComponent } from './components/ticket/reservation-modal/reservation-modal.component';
import { ControlParkComponent } from './components/control/control-park/control-park.component';
import { ControlModalComponent } from './components/control/control-modal/control-modal.component';
import { ControlReservationComponent } from './components/ticket/control-reservation/control-reservation.component';
import { ControlModalReservationComponent } from './components/control-modal-reservation/control-modal-reservation.component';
import { ReservationComponent } from './components/report/reservation/reservation.component';
import { NacionalidadComponent } from './components/report/nacionalidad/nacionalidad.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent,
    ProgressBarComponent,
    LoginComponent,
    SignInComponent,
    SpinnerComponent,
    ConfirmCodeComponent,
    ListRatesComponent,
    AddEditRateComponent,
    ListParksComponent,
    AddEditComponent,
    FilterPipe,
    ListRolesComponent,
    AddEditRoleComponent,
    PruebasComponent,
    BuyTicketComponent,
    ListParkComponent,
    AdministrativeListComponent,
    ReservationModalComponent,
    ControlParkComponent,
    ControlModalComponent,
    ControlReservationComponent,
    ControlModalReservationComponent,
    ReservationComponent,
    NacionalidadComponent
  ],
  imports: [
    MatCardModule,
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
