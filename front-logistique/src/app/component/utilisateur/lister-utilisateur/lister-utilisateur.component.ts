import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from 'src/app/service/user.service';
import {Router} from "@angular/router";
import {Fournisseur} from "../../../model/fournisseur";
import {FournisseurService} from "../../../service/fournisseur.service";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "../../../service/role.service";
import {Role} from "../../../model/role";
import {CampusService} from "../../../service/campus.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lister-utilisateur',
  templateUrl: './lister-utilisateur.component.html',
  styleUrls: ['./lister-utilisateur.component.css']
})
export class ListerUtilisateurComponent implements OnInit{

  user!: any;
  utilisateurs : any[] = [];
  fournisseurs : Fournisseur[] = [];
  role!:string;
  campuses!:any[];
  constructor(private campusService: CampusService,private rolseService:RoleService,private userService:UserService,private router:Router,private fournisseurService : FournisseurService,private notification:ToastrService) {
  }
  ngOnInit() {
    this.getUserData();
    this.campusService.getCampus().subscribe(
      res => this.campuses = res,
      error => console.log(error)
    );
    this.getFournisseurData();
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.rolseService.getRoleByIdRole(this.user.idRole).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur!");
    }
  }
  redirectTo(id:number){
    this.router.navigate(['/admin/userEdit',id]);
  }
  redirectToF(id:number){
    this.router.navigate(['/admin/editFournisseur',id]);
  }

  voirMateriels(nomtable: string, id:any){
    this.router.navigate(['/admin/voir-materiels',nomtable,id]);
  }

  getRole(idRole: number, user: User) {
    this.rolseService.getRoleByIdRole(idRole).subscribe(res => {
      user.roleName = res.libelle;  // Ajoutez directement le nom du rôle à l'utilisateur
      console.log('Nom du rôle pour l\'utilisateur:', user.roleName);
    });
  }
  delete(id:number){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(res =>{
            this.notification.success("materiel supprimer avec succcess","Operation reussie");
            this.getUserData();
          }, error => {
            this.notification.success("Une erreur est survenue lors de suppression du matériel.","Operation echouee");
          }
        );
      }
    });
  }
  deleteF(id:number){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.deleteFournisseur(id).subscribe(res =>{
            this.notification.success("fournisseur  supprimer avec succcess","Operation reussie");
            this.getFournisseurData();
          }, error => {
            this.notification.success("Une erreur est survenue lors de suppression du fournisseur.","Operation echouee");
          }
        );
      }
    });
  }
  getUserData(){
    this.userService.getUsers().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
      // Pour chaque utilisateur, récupérez son rôle
      this.utilisateurs.forEach(user => {
        this.getRole(user.idRole, user);  // Passez l'utilisateur pour lier le rôle
      });
      console.log(utilisateurs);
    });
  }

  getFournisseurData(){
    this.fournisseurService.getAllFournisseur().subscribe(res =>{
      this.fournisseurs=res;
      console.log(res);
    });
  }

  goToUserForm(){
    this.router.navigate(['/admin/utilisateur']);
  }
  goToFournisseurForm(){
    this.router.navigate(['/admin/fournisseur']);
  }

  //Verifier si l'utilisateur et le responsable sont dans le même campus
  // idU etant l'id du campus ou ce trouve le personnel
  ifSameCampus(idU:any){
    let dataCampus = this.campuses.find(c => c.id == idU);
    return dataCampus?.idUser==this.user.id;
  }

}
