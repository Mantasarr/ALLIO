import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
    //{path:"", redirectTo:"/connexion", pathMatch:"full"},
    //{path:"home", component:HomeComponent},
    //{path:"connexion", component:ConnexionComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
