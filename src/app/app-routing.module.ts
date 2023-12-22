import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NouvelleCampagneComponent } from './nouvelle-campagne/nouvelle-campagne.component';
import { ProspectusComponent } from './prospectus/prospectus.component';
import { ParametresComponent } from './parametres/parametres.component';
import { BonDeReductionComponent } from './bon-de-reduction/bon-de-reduction.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccComponent } from './accueil/acc/acc.component';
import { FideliteComponent } from './fidelite/fidelite.component';

const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"connexion", component:ConnexionComponent},
    {path:"inscription", component:InscriptionComponent},
    {path:"nouvelle-campagne", component:NouvelleCampagneComponent},
    {path:"prospectus", component:ProspectusComponent},
    {path:"parametres", component:ParametresComponent},
    {path:"bon-de-reduction", component:BonDeReductionComponent},
    {path:"deconnexion", component:DeconnexionComponent},
    {path:"accueil", component:AccueilComponent},
    {path:"acc", component:AccComponent},
    {path:"fidelite", component:FideliteComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
