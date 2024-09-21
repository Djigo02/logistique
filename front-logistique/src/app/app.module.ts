import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './component/base/base.component';
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
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarAdminComponent } from './pages/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './pages/sidebar-admin/sidebar-admin.component';
import { MaterielFormComponent } from './component/materiel-form/materiel-form.component';
import { MaterielEditComponent } from './component/materiel/materiel-edit/materiel-edit.component';
import { FournisseurComponent } from './component/fournisseur/fournisseur.component';
import { UtilisateurEditComponent } from './component/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { UtilisateurFormComponent } from './component/utilisateur-form/utilisateur-form.component';
import { ListeTypematerielComponent } from './component/type-materiel/liste-typemateriel/liste-typemateriel.component';
import { TypeMaterielFormComponent } from './component/type-materiel-form/type-materiel-form.component';
import { EdittypeMaterielComponent } from './component/type-materiel/edittype-materiel/edittype-materiel.component';
import { EditFournisseurComponent } from './component/fournisseur/edit-fournisseur/edit-fournisseur.component';
import { FournisseurFormComponent } from './component/fournisseur-form/fournisseur-form.component';
import { SallesincampusComponent } from './component/campus/sallesincampus/sallesincampus.component';
import { FormCampusComponent } from './component/campus/form-campus/form-campus.component';
import { UpdateCampusComponent } from './component/campus/update-campus/update-campus.component';
import { UpdateSalleComponent } from './component/salle/update-salle/update-salle.component';
import { FormSalleComponent } from './component/salle/form-salle/form-salle.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { AffectationComponent } from './component/affectation/affectation.component';
import { ListAffectationComponent } from './component/affectation/list-affectation/list-affectation.component';
import { VoirListeMaterielComponent } from './component/voir-liste-materiel/voir-liste-materiel.component';
import { TransfertMaterielComponent } from './component/affectation/transfert-materiel/transfert-materiel.component';
import { TransfertMaterielUseComponent } from './component/affectation/transfert-materiel-use/transfert-materiel-use.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DemandeComponent } from './component/demande/demande.component';
import { DemandeFormComponent } from './component/demande/demande-form/demande-form.component';
import { UserAffectationComponent } from './component/user-affectation/user-affectation.component';
import { AllDemandeComponent } from './component/all-demande/all-demande.component';



export function tokenGetter() {
  return localStorage.getItem('access_token');
}
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
    LoginComponent,
    NotFoundComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    MaterielFormComponent,
    MaterielEditComponent,
    FournisseurComponent,
    UtilisateurEditComponent,
    UtilisateurFormComponent,
    ListeTypematerielComponent,
    TypeMaterielFormComponent,
    EdittypeMaterielComponent,
    EditFournisseurComponent,
    FournisseurFormComponent,
    SallesincampusComponent,
    FormCampusComponent,
    UpdateCampusComponent,
    UpdateSalleComponent,
    FormSalleComponent,
    AffectationComponent,
    ListAffectationComponent,
    VoirListeMaterielComponent,
    TransfertMaterielComponent,
    TransfertMaterielUseComponent,
    DemandeComponent,
    DemandeFormComponent,
    UserAffectationComponent,
    AllDemandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() ,// ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000'], // change to your backend domain
        disallowedRoutes: ['http://localhost:8000/api/login'], // exclude login route from JWT
      },
    }),
  ],
  providers: [
    TypeMaterielService,


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
