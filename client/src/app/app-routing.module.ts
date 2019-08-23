import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: AuthComponent},
  {path: 'product/:sku', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
