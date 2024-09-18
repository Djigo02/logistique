import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit{

  user:User | null= null;
  constructor(private router:Router, private authService: AuthService){}


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
  goToAffectation(){
    this.router.navigate(['/admin/listAffectation']);
  }
  goToMyAffectation(){
    this.router.navigate(['/admin/listMyAffectation']);
  }
  goTODemande(){
    this.router.navigate(['/admin/demande']);
  }

  goTOAllDemande(){
    this.router.navigate(['/admin/alldemande']);
  }
  ngOnInit(): void {
    this.authService.getUser().subscribe(res =>{
      this.user=res;
    })

  }

}
