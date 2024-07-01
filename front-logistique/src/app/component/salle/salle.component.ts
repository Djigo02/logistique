import {Component, OnInit} from '@angular/core';
import {CampusService} from "../../service/campus.service";
import {SalleService} from "../../service/salle.service";
import {Router} from "@angular/router";
import {Campus} from "../../model/campus";
import {Salle} from "../../model/salle";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  campusList!:Campus[];
  salle!:Salle;
  ngOnInit(): void {
    this.salle = new Salle();
    this.campusService.getCampus().subscribe(data => {
      this.campusList = data;
      console.log(this.campusList);
    });
  }

  constructor(
    private campusService: CampusService,
    private salleService: SalleService,
    private router: Router,
  ) { }

  onSubmit(){
    this.salleService.insertSalle(this.salle).subscribe(
      response => {
        alert('Campus ajouté avec succès'+this.salle.nomSalle);
        this.salle.nomSalle = "";
        this.salle.capacite = "";
        this.router.navigate(['/admin/campus']);
      },
      error => {
        console.log(this.salle);
        console.log(error);
      }
    );
  }
}
