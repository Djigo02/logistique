import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {Campus} from "../../../model/campus";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";

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
  user: User | null = null;

  ngOnInit() {
    this.getCampus();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }

  constructor(private authService:AuthService,private router:Router, private campusService:CampusService,private notification: ToastrService) {
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
    this.campusService.deleteCampus(id).subscribe(
      () => {
        this.notification.success(`Campus  a ete supprime avec succes`,"Operation reussie")
        this.getCampus();
      }
    );
  }

  voirMateriels(nomtable: string, id:any){
    this.router.navigate(['/admin/voir-materiels',nomtable,id]);
  }
  goToUpdateCampus(id:any){
    this.router.navigate(['/admin/update-campus',id]);
  }
}
