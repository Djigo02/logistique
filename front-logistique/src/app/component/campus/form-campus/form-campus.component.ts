import {Component, Input} from '@angular/core';
import {Campus} from "../../../model/campus";
import {User} from "../../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {UserService} from "../../../service/user.service";
import Swal from 'sweetalert2';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-campus',
  templateUrl: './form-campus.component.html',
  styleUrls: ['./form-campus.component.css']
})
export class FormCampusComponent {

  @Input() campus!: Campus;
  responsables!: User[];
  isAddForm !: boolean;



  ngOnInit(){
    this.campus = new Campus();
    this.userService.getUsers().subscribe(
      response =>{
        this.responsables = response.filter(user => user.idRole==1);
      }
    );
    this.isAddForm = this.url.snapshot.params['id'] === undefined;
  }

  constructor(
    private url:ActivatedRoute,
    private router: Router,
    private campusService: CampusService,
    private userService: UserService,
    private notification: ToastrService
  ) {}

  onSubmit(){
      if(this.isAddForm){
        this.campusService.insertCampus(this.campus).subscribe(
          response => {
            this.notification.success(`Campus  a ete ajoute avec succes`,"Operation reussie");
            this.router.navigate(['/admin/listescampus']);
             this.campus.nomCampus = "";
             this.campus.telephone = "";
             this.campus.departement = "";
             this.campus.region = "";
             this.campus.adresse = "";
             this.campus.idUser = "";
             this.campus.etat = "";
             this.campus.id = 0;
          },
          error => {
            this.notification.error(`Ajout du  campus à ehoue`,"Operation echoue")
          }
        );
      }
      else{
        this.campusService.updateCampus(this.campus).subscribe(
          response => {
            this.notification.success(`Campus  a ete modifie avec succes`,"Operation reussie")
            this.router.navigate(['/admin/listescampus']);
          },
          error => {
            this.notification.success(` erreur lors de la modification du Campus  a ete modifie avec succes`,"Operation echoue")
          }
        );
      }


  }
}
