import {Component, Input} from '@angular/core';
import {Campus} from "../../../model/campus";
import {User} from "../../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {UserService} from "../../../service/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-campus',
  templateUrl: './form-campus.component.html',
  styleUrls: ['./form-campus.component.css']
})
export class FormCampusComponent {

  @Input() campus!: Campus;
  responsables!: User[];
  isAddForm !: boolean;

  validateForm(): boolean {
    const { nomCampus, adresse, region, departement, telephone, idUser } = this.campus;

    const messages = [];

    if (!nomCampus) messages.push(' "Nom campus"  obligatoire.');
    if (!adresse) messages.push('"Adresse"  obligatoire.');
    if (!region) messages.push(' "Région"  obligatoire.');
    if (!departement) messages.push('  "Département"  obligatoire.');
    if (!telephone) messages.push(' "Téléphone"  obligatoire.');
    if (!idUser) messages.push(' "Responsable"  obligatoire.');

    if (messages.length > 0) {
      Swal.fire({
        title: 'Erreur',
        html: messages.join('<br>'),
        icon: 'error',
        confirmButtonColor: '#2f1514',
      });
      return false;
    }

    return true;
  }

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
    private userService: UserService
  ) {}

  onSubmit(){
    if(this.validateForm()){
      if(this.isAddForm){
        this.campusService.insertCampus(this.campus).subscribe(
          response => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Campus ajouté avec succès",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/campus']);
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
            console.log(this.campus);
            console.log(error);
          }
        );
      }else{
        this.campusService.updateCampus(this.campus).subscribe(
          response => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Campus modifié avec succès",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/listescampus']);
          },
          error => {
            console.log(this.campus);
            console.log(error);
          }
        );
      }
    }

  }
}
