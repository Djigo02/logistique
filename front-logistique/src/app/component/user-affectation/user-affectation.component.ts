import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {AffectationService} from "../../service/affectation.service";
import {Affectation} from "../../model/affectation";

@Component({
  selector: 'app-user-affectation',
  templateUrl: './user-affectation.component.html',
  styleUrls: ['./user-affectation.component.css']
})
export class UserAffectationComponent implements OnInit{
  // campus
  affectation :Affectation[] = [];
  // salles

  user: User | null = null;
  ngOnInit(): void {
    this.getAllAffectationForNT();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }

  constructor(private authService:AuthService,private router: Router,private affectationService:AffectationService) {
  }

  goToAdd(){
    this.router.navigate(['/admin/affectation']);
  }
  getAllAffectationForNT(){
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log('myaffectation',this.user.id);
        this.affectationService.getAffectationByUser(this.user.id).subscribe(res =>
        {
          this.affectation= res;
          console.log(this.affectation);
        });
      },
      error: (err) => {
      }});



  }



}
