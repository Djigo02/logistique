
import {CampusService} from '../../service/campus.service'
import {Campus} from "src/app/model/campus"
import { Component, OnInit  } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";


@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements  OnInit {

  campus!: Campus;
  responsables!: User[];

  ngOnInit(){
    this.campus = new Campus();
    this.userService.getUsers().subscribe(
      response =>{
        this.responsables = response.filter(user => user.idRole==1);
      }

    )
  }

  constructor(
    private router: Router,
    private campusService: CampusService,
    private userService: UserService
  ) {}

  onSubmit(){
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
  }
}
