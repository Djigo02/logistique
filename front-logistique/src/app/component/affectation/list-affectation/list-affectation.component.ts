import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AffectationService} from "../../../service/affectation.service";
import {Affectation} from "../../../model/affectation";

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent implements OnInit{
  // campus
  affectation :any = [];
  // salles
  affectationS: any= [];
  // users
  affectationU :any = [];
  ngOnInit(): void {
    this.getAllAffectationForNT();
  }

  constructor(private router: Router,private affectationService:AffectationService) {
  }

  goToAdd(){
    this.router.navigate(['/admin/affectation']);
  }
  getAllAffectationForNT(){
     this.affectationService.getAffectationFNT('campuses').subscribe(res =>
    {
      this.affectation= res;
      console.log(this.affectation);
    });
     this.affectationService.getAffectationFNT('salles').subscribe(res =>
    {
      this.affectationS= res;
      console.log(this.affectationS);
    });
     this.affectationService.getAffectationFNT('users').subscribe(res =>
    {
      this.affectationU= res;
      console.log(this.affectationU);
    });

  }


}
