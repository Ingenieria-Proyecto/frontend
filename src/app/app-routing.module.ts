import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './utils/auth.guard';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ListParksComponent } from './components/park/list-parks/list-parks.component';
import { AddEditComponent } from './components/park/add-edit/add-edit.component';


const routes: Routes = [
  {path: '', component: ListProductsComponent,canActivate: [AuthGuard] },
  {path: 'add', component: AddEditProductComponent},
  {path: 'edit/:id', component: AddEditProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confirm', component: ConfirmCodeComponent},
  {path: 'signIn', component: SignInComponent},
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
