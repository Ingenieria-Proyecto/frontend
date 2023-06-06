import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './utils/auth.guard';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ListRatesComponent } from './components/list-rates/list-rates.component';
import { AddEditRateComponent } from './components/add-edit-rate/add-edit-rate.component';
import { ListParksComponent } from './components/park/list-parks/list-parks.component';
import { AddEditComponent } from './components/park/add-edit/add-edit.component';
import { ListRolesComponent } from './components/list-roles/list-roles.component';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { UsersGuard } from './utils/users.guard';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';

const routes: Routes = [
  {path: '', component: LoginComponent,canActivate: [AuthGuard]},
  {path: 'add', component: AddEditProductComponent},
  {path: 'edit/:id', component: AddEditProductComponent},
  {path: 'confirm', component: ConfirmCodeComponent},
  {path: 'home', component: ListProductsComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'rates', component: ListRatesComponent, canActivate: [UsersGuard]},
  {path: 'addRate', component: AddEditRateComponent},
  {path: 'editRate/:id', component: AddEditRateComponent},
  {path: 'listPark', component: ListParksComponent},
  {path: 'editPark/:id', component: AddEditComponent},
  {path: 'addPark', component: AddEditComponent},
  {path: 'listRole', component: ListRolesComponent},
  {path: 'addRole', component: AddEditRoleComponent},
  {path: 'editRole/:id', component: AddEditRoleComponent},
  {path: 'reservation/:id', component: BuyTicketComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
