import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './component/base/base.component';
import { CampusComponent } from './component/campus/campus.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { SalleComponent } from './component/salle/salle.component';
import { RoleComponent } from './component/role/role.component';
import { TypeMaterielComponent } from './component/type-materiel/type-materiel.component';
import { MaterielComponent } from './component/materiel/materiel.component';
import { ListerCampusComponent } from './component/campus/lister-campus/lister-campus.component';
import { ListerUtilisateurComponent } from './component/utilisateur/lister-utilisateur/lister-utilisateur.component';
import { ListerMaterielComponent } from './component/materiel/lister-materiel/lister-materiel.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {MaterielEditComponent} from "./component/materiel/materiel-edit/materiel-edit.component";
import {UtilisateurEditComponent} from "./component/utilisateur/utilisateur-edit/utilisateur-edit.component";
import {ListeTypematerielComponent} from "./component/type-materiel/liste-typemateriel/liste-typemateriel.component";
import {EdittypeMaterielComponent} from "./component/type-materiel/edittype-materiel/edittype-materiel.component";
import {EditFournisseurComponent} from "./component/fournisseur/edit-fournisseur/edit-fournisseur.component";
import {FournisseurComponent} from "./component/fournisseur/fournisseur.component";
import {SallesincampusComponent} from "./component/campus/sallesincampus/sallesincampus.component";
import {UpdateCampusComponent} from "./component/campus/update-campus/update-campus.component";
import {UpdateSalleComponent} from "./component/salle/update-salle/update-salle.component";
import {AffectationComponent} from "./component/affectation/affectation.component";
import {ListAffectationComponent} from "./component/affectation/list-affectation/list-affectation.component";
import {VoirListeMaterielComponent} from "./component/voir-liste-materiel/voir-liste-materiel.component";
import {
  TransfertMaterielUseComponent
} from "./component/affectation/transfert-materiel-use/transfert-materiel-use.component";
import {AuthGuard} from "./auth.guard";
import {DemandeComponent} from "./component/demande/demande.component";
import {DemandeFormComponent} from "./component/demande/demande-form/demande-form.component";
import {UserAffectationComponent} from "./component/user-affectation/user-affectation.component";
import {AllDemandeComponent} from "./component/all-demande/all-demande.component";

const routes: Routes = [
  // Route de base
  {
    path: 'login',
    component: LoginComponent,
  },
  // Route admin
  {
    path: 'admin',
    component: BaseComponent, canActivate:[AuthGuard],
      children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'demande', component: DemandeComponent },
      { path: 'alldemande', component: AllDemandeComponent },
      { path: 'campus', component: CampusComponent },
      { path: 'utilisateur', component: UtilisateurComponent },
      { path: 'salle', component: SalleComponent },
      { path: 'role', component: RoleComponent },
      { path: 'typeMateriel', component: TypeMaterielComponent },
      { path: 'materiel', component: MaterielComponent },
      { path: 'matEdit/:id', component: MaterielEditComponent },
      { path: 'listescampus', component: ListerCampusComponent },
      { path: 'listesutilisateurs', component: ListerUtilisateurComponent },
      { path: 'demandeForm', component: DemandeFormComponent },
      { path: 'userEdit/:id', component: UtilisateurEditComponent },
      { path: 'listesmateriels', component: ListerMaterielComponent },
      { path: 'listesTypemateriels', component: ListeTypematerielComponent },
      { path: 'editTypemateriels/:id', component: EdittypeMaterielComponent },
      { path: 'editFournisseur/:id', component: EditFournisseurComponent },
      { path: 'fournisseur', component: FournisseurComponent },
      {path: 'sallesin/:id', component: SallesincampusComponent },
      {path: 'editSalle/:id', component: UpdateSalleComponent },
      {path: 'update-campus/:id', component: UpdateCampusComponent },
      {path: 'affectation',component:AffectationComponent},
      {path: 'listAffectation',component:ListAffectationComponent},
      {path: 'listMyAffectation',component:UserAffectationComponent},
      {path:'voir-materiels/:nomtable/:id', component:VoirListeMaterielComponent},
      {path:'transfert-materiels/:id', component:TransfertMaterielUseComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, // Redirection par défaut
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Page Not Found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
