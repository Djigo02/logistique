import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {Campus} from "../../../model/campus";
import {Salle} from "../../../model/salle";
import {SalleService} from "../../../service/salle.service";
import {User} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-sallesincampus',
  templateUrl: './sallesincampus.component.html',
  styleUrls: ['./sallesincampus.component.css']
})
export class SallesincampusComponent implements OnInit {

  focuscampus!:Campus;
  sallesincampus!: Salle[];
  user: User | null = null;

  constructor(private router:Router,private url: ActivatedRoute , private campusService:CampusService,private authService:AuthService, private salleService:SalleService) { }
  ngOnInit() {
   this.getCampus();
   this.getSalles();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }

  getSalles() {
    this.campusService.getSallesByCampusId(this.url.snapshot.params['id']).subscribe(data => {
      this.sallesincampus = data;
    });
  }

  getCampus() {
    this.campusService.getCampusById(this.url.snapshot.params['id']).subscribe(data => {
      this.focuscampus = data;
    });
  }

  // Aller à la page d'ajout campus
  goToSalleForm(){
    this.router.navigate(['/admin/salle']);
  }

  deleteSalle(id:any){
    this.salleService.deleteSalle(id).subscribe(()=>{
      this.getSalles();
      alert('salle supprimé avec succès');
    })
  }

  voirMateriels(nomtable: string, id:any){
    this.router.navigate(['/admin/voir-materiels',nomtable,id]);
  }
  goToSalleUpdate(id:any){
    this.router.navigate(['/admin/editSalle', id]);
  }
}
