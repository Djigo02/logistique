import {Component, Input, OnInit} from '@angular/core';
import {AffectationService} from "../../../service/affectation.service";
import {Router} from "@angular/router";
import {Campus} from "../../../model/campus";
import {CampusService} from "../../../service/campus.service";
import {MaterielService} from "../../../service/materiel.service";
import {Materiel} from "../../../model/materiel";
import {TypeMateriel} from "../../../model/type-materiel";
import {TypeMaterielService} from "../../../service/type-materiel.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transfert-materiel',
  templateUrl: './transfert-materiel.component.html',
  styleUrls: ['./transfert-materiel.component.css']
})
export class TransfertMaterielComponent implements OnInit {
  @Input() affectation!:any
  campus!:Campus[];
  materiel!:Materiel;
  // typeMateriels !: TypeMateriel[];
  constructor(private affectationService: AffectationService, private router: Router,
              private campusService:CampusService, private materielService: MaterielService,
              private notification: ToastrService) { }

  ngOnInit() {
    this.getAllCampus();
    // this.getMateriels(this.affectation.idMateriel);
  }

  transferer(){
    // console.log(this.affectation)
    this.affectationService.transfererMateriel(this.affectation).subscribe(res => {
        // @ts-ignore
        if(res.statusCode === 200){
          this.notification.success('La transfert du materiel a été effectué avec succès', 'Information');
          this.router.navigate(['/admin/listAffectation']);
          // @ts-ignore
        }else if(res.statusCode === 400){
          this.notification.error('Quantité indisponible!');
        }else{
          this.notification.error('Une erreur est survenue lors du transfert');
        }
    },
    err => {
      console.log("Erreur lors de la transfert : ", err);
    })
  }

  getAllCampus(){
    this.campusService.getCampus().subscribe(data => {
      this.campus = data;
    });
  }

  onTypeMaterielChange(event: any){
    const  selectedTypeMateriel = event.target.value;
    if(selectedTypeMateriel){
      this.getMateriels(selectedTypeMateriel);
    }else {
      console.log("error")
    }

    //console.log('Type Materiel sélectionné:', this.selectedTypeMateriel);
  }

  getMateriels(id : any){
    this.materielService.getMaterielById(id).subscribe(res => {
      this.materiel = res ;
    });
  }

}
