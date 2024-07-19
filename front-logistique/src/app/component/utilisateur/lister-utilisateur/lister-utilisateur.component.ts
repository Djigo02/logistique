import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from 'src/app/service/user.service';
import {Router} from "@angular/router";
import {Fournisseur} from "../../../model/fournisseur";
import {FournisseurService} from "../../../service/fournisseur.service";

@Component({
  selector: 'app-lister-utilisateur',
  templateUrl: './lister-utilisateur.component.html',
  styleUrls: ['./lister-utilisateur.component.css']
})
export class ListerUtilisateurComponent implements OnInit{

  utilisateurs : User[] = [];
  fournisseurs : Fournisseur[] = [];
  constructor(private userService:UserService,private router:Router,private fournisseurService : FournisseurService) {
  }
  ngOnInit() {
    this.getUserData();
    this.getFournisseurData();
  }
  redirectTo(id:number){
    this.router.navigate(['/admin/userEdit',id]);
  }
  redirectToF(id:number){
    this.router.navigate(['/admin/editFournisseur',id]);
  }
  delete(id:number){
    this.userService.deleteUser(id).subscribe(res =>{
      alert('materiel supprimer avec succces');
      this.getUserData();
    }, error => {
        console.error('Erreur lors de la suppression du matériel:', error);
        alert('Une erreur est survenue lors de suppression du matériel.');
      }
    );
  }
  deleteF(id:number){
    this.fournisseurService.deleteFournisseur(id).subscribe(res =>{
      alert('materiel supprimer avec succces');
      this.getFournisseurData();
    }, error => {
        console.error('Erreur lors de la suppression du matériel:', error);
        alert('Une erreur est survenue lors de suppression du matériel.');
      }
    );
  }
  getUserData(){
    this.userService.getUsers().subscribe(res =>{
      this.utilisateurs = res;
      console.log(res);
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

}
