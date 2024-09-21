import {Component, OnInit} from '@angular/core';
import {DemandeService} from "../../service/demande.service";

import {Demande} from "../../model/demande";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demandesu:Demande[]=[];
  user: User | null = null;
  idD!:number;
  constructor(private demandeService:DemandeService,private authserve:AuthService ,private route:Router) {
  }

  ngOnInit(): void {
    this.getMyDemande();

  }

  getMyDemande(){
    this.authserve.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log('mydemnade',this.user.id);
        this.demandeService.getDemandeUser(this.user.id).subscribe(res =>{
          this.demandesu = res;
          console.log(this.demandesu);

        });
      },
      error: (err) => {
      }});
  }


  gotodemandeForm(){
    this.route.navigate(['/admin/demandeForm']);
  }



}
