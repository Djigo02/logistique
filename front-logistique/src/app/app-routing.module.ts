import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./component/base/base.component";
import {CampusComponent } from "./component/campus/campus.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {UtilisateurComponent} from "./component/utilisateur/utilisateur.component";
import {SalleComponent} from "./component/salle/salle.component";
import {RoleComponent} from "./component/role/role.component";
import {TypeMaterielComponent} from "./component/type-materiel/type-materiel.component";
import {MaterielComponent} from "./component/materiel/materiel.component";
import {ListerCampusComponent} from "./component/campus/lister-campus/lister-campus.component";
import {ListerUtilisateurComponent} from "./component/utilisateur/lister-utilisateur/lister-utilisateur.component";
import {ListerMaterielComponent} from "./component/materiel/lister-materiel/lister-materiel.component";



const routes: Routes = [
  { path: '', component: BaseComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'campus',component:CampusComponent},
      {path: 'utilisateur',component:UtilisateurComponent},
      {path: 'salle',component:SalleComponent},
      {path: 'role',component:RoleComponent},
      {path: 'typeMateriel',component:TypeMaterielComponent},
      {path: 'materiel',component:MaterielComponent},
      {path: 'listerCampus',component:ListerCampusComponent},
      {path : 'ListerUtilisateur' , component:ListerUtilisateurComponent},
      {path : 'ListerMateriel' , component:ListerMaterielComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





