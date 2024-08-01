import {Component, OnInit} from '@angular/core';
import {AffectationService} from "../../service/affectation.service";
import {Router} from "@angular/router";
import {TypeMaterielService} from "../../service/type-materiel.service";
import {MaterielService} from "../../service/materiel.service";
import {TypeMateriel} from "../../model/type-materiel";
import {Materiel} from "../../model/materiel";
import {Campus} from "../../model/campus";
import {CampusService} from "../../service/campus.service";
import {SalleService} from "../../service/salle.service";
import {Salle} from "../../model/salle";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {Affectation} from "../../model/affectation";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit{
  typeMateriels : TypeMateriel[] = [];
  materiel : Materiel[] =[];
  campus : Campus[] =[];
  salle:Salle[]=[];
  user:User[]=[];
  affectation!: Affectation;
  affectations :Affectation[] = [];

  constructor(private notification: ToastrService,private  affectationService:AffectationService,private userService:UserService,private salleService: SalleService ,private typeMatService : TypeMaterielService,private campusService:CampusService,private materielService : MaterielService ,private  router:Router) {
  }

  onSubmitForCampus(){
    this.affectation.nomTable = "campuses";
    this.affectationService.insertAffectation(this.affectation).subscribe(
      next =>{
        this.notification.success(`L'affectation a ete effectuer avec succes`,"Operation reussie")
      },
      error => {
        this.notification.error("Erreur lors de l'affection veuillez reessayer ulterieurement !","Echec de l'operation");
        console.log(error);
      }
    );
    // Reinitialiser le formulaire
    this.resetForm();
  }

  onSubmitForSalle(){
    this.affectation.nomTable = "salles";
    this.affectationService.insertAffectation(this.affectation).subscribe(
      next =>{
        this.notification.success(`L'affectation a ete effectuer avec succes`,"Operation reussie")
      },
      error => {
        this.notification.error("Erreur lors de l'affection veuillez reessayer ulterieurement !","Echec de l'operation")
      }
    );
    // Reinitialiser le formulaire
    this.resetForm();
  }
  onSubmitForPersonnel(){
    this.affectation.nomTable = "users";
    this.affectationService.insertAffectation(this.affectation).subscribe(
      next =>{
        this.notification.success(`L'affectation a ete effectuer avec succes`,"Operation reussie")
      },
      error => {
        this.notification.error("Erreur lors de l'affection veuillez reessayer ulterieurement !","Echec de l'operation")
      }
    );
    // Reinitialiser le formulaire
    this.resetForm();
  }

  getTypeMateriels(){
    this.typeMatService.getAllTypeMateriels().subscribe(res => {
      this.typeMateriels = res ;
      console.log(this.typeMateriels);
    });
  }
  getUser(){
    this.userService.getUsers().subscribe(res => {
      this.user=res;
    });
  }
  getMateriels($id : any){
    this.materielService.getMatByTypeMat($id).subscribe(res => {
      this.materiel = res ;
      console.log(this.materiel);
    });
  }
  getCampus(){
    this.campusService.getCampus().subscribe(res => {
      this.campus = res ;
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
  getSalles($id:any){
    this.salleService.getSalleByCampus($id).subscribe(res =>{
      this.salle = res ;
    });
  }

 onCampusChange(event:any){
    const selectedCampus = event.target.value;
    if(selectedCampus){
      this.getSalles(selectedCampus);
    }else {
      console.log("error")
    }
 }
  ngOnInit() {
    this.getCampus();
    this.getTypeMateriels();
    //this.onTypeMaterielChange(event);
    this.getMateriels(this.onTypeMaterielChange(event));
    this.getSalles(this.onCampusChange(event));
    this.getUser();
    this.affectation = new Affectation();
  }

  resetForm(){
    this.affectation.nomTable = "";
    this.affectation.quantite = null
    this.affectation.idMateriel = null;
    this.affectation.concerne_id = null;
  }
}
