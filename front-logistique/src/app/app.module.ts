import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BaseComponent} from "./component/base/base.component";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CampusComponent } from './component/campus/campus.component';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { SalleComponent } from './component/salle/salle.component';
import { RoleComponent } from './component/role/role.component';
import { TypeMaterielComponent } from './component/type-materiel/type-materiel.component';
import { MaterielComponent } from './component/materiel/materiel.component';
import { ListerCampusComponent } from './component/campus/lister-campus/lister-campus.component';
import { ListerUtilisateurComponent } from './component/utilisateur/lister-utilisateur/lister-utilisateur.component';
import { ListerMaterielComponent } from './component/materiel/lister-materiel/lister-materiel.component';
import { TypeMaterielService } from 'src/app/service/type-materiel.service';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    DashboardComponent,
    CampusComponent,
    UtilisateurComponent,
    SalleComponent,
    RoleComponent,
    TypeMaterielComponent,
    MaterielComponent,
    ListerCampusComponent,
    ListerUtilisateurComponent,
    ListerMaterielComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TypeMaterielService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
