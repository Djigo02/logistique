import {Component, OnInit} from '@angular/core';
import { MaterielService } from 'src/app/service/materiel.service';
import {Materiel} from "../../../model/materiel";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-lister-materiel',
  templateUrl: './lister-materiel.component.html',
  styleUrls: ['./lister-materiel.component.css']
})
export class ListerMaterielComponent implements OnInit{
  materiels :Materiel[] = [];
  user: User | null = null;


  constructor(private authService:AuthService,private materielSerice: MaterielService,private router:Router) {
  }

  redirectTo(id : number){
    this.router.navigate(['/admin/matEdit',id]);
  }
  delete(id:number){
    this.materielSerice.deleteMateriel(id).subscribe(res =>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: " materiel supprimer avec succces ",
          showConfirmButton: false,
          timer: 1500
        });
        this.getMaterielData();
    }, error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: " Erreur lors de la supression du matériel: ",
          showConfirmButton: false,
          timer: 1500
        });

      }
      );
  }
  getMaterielData() {
    this.materielSerice.getMateriel().subscribe(res => {
      this.materiels = res;
      console.log(this.materiels);
    });
  }
  ngOnInit() {
    this.getMaterielData();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }

  goToAdd(){
    this.router.navigate(['/admin/materiel']);
  }

}
