import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {path: '', component: ListProductsComponent,canActivate: [AuthGuard] },
  {path: 'add', component: AddEditProductComponent},
  {path: 'edit/:id', component: AddEditProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
