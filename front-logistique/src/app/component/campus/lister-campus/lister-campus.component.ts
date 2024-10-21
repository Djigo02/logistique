import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {Campus} from "../../../model/campus";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";
import {RoleService} from "../../../service/role.service";

@Component({
  selector: 'app-lister-campus',
  templateUrl: './lister-campus.component.html',
  styleUrls: ['./lister-campus.component.css']
})
export class ListerCampusComponent implements OnInit{

  campusList!: Campus[];
  userprenom!:string;
  usernom!:string;
  useremail!:string;
  useridRole!:number;
  user: any | null = null;

  ngOnInit() {
    this.getCampus();
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.role.getRoleByIdRole(this.user.idRole).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  constructor(private authService:AuthService, private role: RoleService,private router:Router, private campusService:CampusService,private notification: ToastrService) {
  }

  getCampus(){
    this.campusService.getCampus().subscribe(data => {
      this.campusList = data;
      console.log(this.campusList);
    });
  }

  goToCampusForm(){
    this.router.navigate(['/admin/campus']);
  }

  goToSalles(id: any){
    this.router.navigate(['/admin/sallesin',id]);
  }

  deleteCampus(id:any){

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
        this.campusService.deleteCampus(id).subscribe(
          () => {
            this.notification.success(`Campus  a ete supprime avec succes`,"Operation reussie")
            this.getCampus();
          }
        );
      }
    });

  }

  voirMateriels(nomtable: string, id:any){
    this.router.navigate(['/admin/voir-materiels',nomtable,id]);
  }
  goToUpdateCampus(id:any){
    this.router.navigate(['/admin/update-campus',id]);
  }
}
