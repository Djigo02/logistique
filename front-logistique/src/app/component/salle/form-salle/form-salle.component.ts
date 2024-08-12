import {Component, Input, OnInit} from '@angular/core';
import {Campus} from "../../../model/campus";
import {Salle} from "../../../model/salle";
import {CampusService} from "../../../service/campus.service";
import {SalleService} from "../../../service/salle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
  styleUrls: ['./form-salle.component.css']
})
export class FormSalleComponent implements OnInit {
  isAddSalle!: boolean
  campusList!:Campus[];
  @Input() salle!:Salle;
  ngOnInit(): void {
    this.isAddSalle =  this.router.url.includes('salle');
    this.salle = new Salle();
    this.campusService.getCampus().subscribe(data => {
      this.campusList = data;
      console.log(this.campusList);
    });
  }

  constructor(
    private campusService: CampusService,
    private salleService: SalleService,
    private router: Router,private  actRouter:ActivatedRoute,private notification: ToastrService
  ) { }

  isCampusInvalid = false;

  validateCampusSelection() {
    if (this.salle.idCampus === null || this.salle.idCampus === '') {
      this.isCampusInvalid = true;
    } else {
      this.isCampusInvalid = false;
    }
  }


  onSubmit(){
    if (this.isAddSalle){
      this.salleService.insertSalle(this.salle).subscribe(
        response => {
          this.notification.success(`Salle  a ete ajoute avec succes`,"Operation reussie");
          this.salle.nomSalle = "";
          this.salle.capacite = "";
          this.router.navigate(['/admin/sallesin',this.salle.idCampus]);
        },
        error => {
          this.notification.success(`Erreur lors de l'ajout de la salle`,"Operation echoue");
        }
      );
    }else{
      this.salleService.updateSalle(this.salle).subscribe(res =>{
          this.router.navigate(['admin/sallesin',this.salle.idCampus]);
        },error => {
        this.notification.success(`Erreur lors de l'ajout de la salle`,"Operation echoue");
        }
      );
    }
  }
}
