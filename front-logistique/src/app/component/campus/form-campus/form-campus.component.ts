import {Component, Input} from '@angular/core';
import {Campus} from "../../../model/campus";
import {User} from "../../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {UserService} from "../../../service/user.service";

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
    private userService: UserService
  ) {}

  onSubmit(){
    if(this.isAddForm){
      this.campusService.insertCampus(this.campus).subscribe(
        response => {
          alert('Campus ajouté avec succès'+this.campus.nomCampus);
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
          alert('Campus modifié avec succès'+this.campus.nomCampus);
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
