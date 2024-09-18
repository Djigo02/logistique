import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AffectationService} from "../../../service/affectation.service";
import {Affectation} from "../../../model/affectation";
import {User} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";

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

  goToTransfert(id:any){
    this.router.navigate(['/admin/transfert-materiels/',id]);
  }


}
