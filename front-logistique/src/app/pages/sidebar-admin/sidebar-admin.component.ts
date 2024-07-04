import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  constructor(private router:Router){}

  // Aller au tableau de bord
  goToDashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  // Aller à la liste des campus
  goTOListCampus(){
    this.router.navigate(['/admin/listescampus']);
  }
  // Aller à la page d'ajout campus
  goToCreateCampus(){
    this.router.navigate(['/admin/campus']);
  }
  // Aller à la liste des salles d'un campus
  goToSallesIn(id:any){
    this.router.navigate(['/admin/sallesin',id]);
  }
  // Aller à la liste des materiels
  goToListMateriels(){
    this.router.navigate(['/admin/listesmateriels']);
  }

  // Aller à la page d'ajout d'un materiel
  goToAddMeteriel(){
    this.router.navigate(['/admin/materiel']);
  }

  // Aller à la liste des types materiels
  goToListTypeMateriel(){
    this.router.navigate(['/admin/listesTypemateriels']);
  }

  // Aller à la page d'ajout campus
  goToCreateSalle(){
    this.router.navigate(['/admin/salle']);
  }

  // Aller à la page de liste des utilisateurs
  goToListeUsers(){
    this.router.navigate(['/admin/listesutilisateurs']);
  }

  // Aller à la page d'jout d'utilisateur
  goToUsers(){
    this.router.navigate(['/admin/utilisateur']);
  }

}
