import {Component, OnInit} from '@angular/core';
import {TypeMateriel} from "../../../model/type-materiel";
import {TypeMaterielService} from "../../../service/type-materiel.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-liste-typemateriel',
  templateUrl: './liste-typemateriel.component.html',
  styleUrls: ['./liste-typemateriel.component.css']
})
export class ListeTypematerielComponent implements OnInit{

  typemateriels:TypeMateriel[]=[];
  typeMateriel!:TypeMateriel;
  user: User | null = null;

  constructor(private authService:AuthService,private typematerielService:TypeMaterielService,private router:Router,private notification:ToastrService) {
  }
  ngOnInit() {
    this.getDataTypeMateriel();
    this.typeMateriel= new TypeMateriel();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }

  getDataTypeMateriel(){
    this.typematerielService.getTypeMateriel().subscribe(res =>{
      this.typemateriels=res;
      console.log(this.typemateriels);
    });
  }
  delete(id:any){
    this.typematerielService.deleteTypeMateriel(id).subscribe(res =>{
        this.notification.success(`type materiel ajoute avec success`,"Operation success");
      this.getDataTypeMateriel();
    },
      error => {
        this.notification.success(`erreur lors de l'ajout du  fournisseur `,"Operation echouee");
      }
      );
  }
  redirectTo(id : number){
    this.router.navigate(['/admin/editTypemateriels',id]);
  }
  goToTMForm(){
    this.router.navigate(['/admin/typeMateriel'])
  }
}
