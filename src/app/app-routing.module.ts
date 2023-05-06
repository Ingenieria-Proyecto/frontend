import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './utils/auth.guard';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';

const routes: Routes = [
  {path: '', component: LoginComponent,canActivate: [AuthGuard]},
  {path: 'add', component: AddEditProductComponent},
  {path: 'edit/:id', component: AddEditProductComponent},
  {path: 'confirm', component: ConfirmCodeComponent},
  {path: 'home', component: ListProductsComponent},
  {path: 'signIn', component: SignInComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
