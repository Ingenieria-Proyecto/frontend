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


const routes: Routes = [
  {path: '', component: LoginComponent,canActivate: [AuthGuard]},
  {path: 'add', component: AddEditProductComponent},
  {path: 'edit/:id', component: AddEditProductComponent},
  {path: 'confirm', component: ConfirmCodeComponent},
  {path: 'home', component: ListProductsComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'rates', component: ListRatesComponent},
  {path: 'addRate', component: AddEditRateComponent},
  {path: 'editRate/:id', component: AddEditRateComponent},
  {path: 'listPark', component: ListParksComponent},
  {path: 'editPark/:id', component: AddEditComponent},
  {path: 'addPark', component: AddEditComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
