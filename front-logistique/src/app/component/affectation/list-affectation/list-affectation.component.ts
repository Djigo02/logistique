import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AffectationService} from "../../../service/affectation.service";
import {Affectation} from "../../../model/affectation";
import {ToastrService} from "ngx-toastr";
import {TypeMateriel} from "../../../model/type-materiel";
import {Materiel} from "../../../model/materiel";
import {Campus} from "../../../model/campus";
import {SalleService} from "../../../service/salle.service";
import {TypeMaterielService} from "../../../service/type-materiel.service";
import {CampusService} from "../../../service/campus.service";
import {MaterielService} from "../../../service/materiel.service";
import {UserService} from "../../../service/user.service";
import {Salle} from "../../../model/salle";
import {User} from "../../../model/user";

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent implements OnInit{
  typeMateriels : TypeMateriel[] = [];
  materiel : Materiel[] =[];
  campus : Campus[] =[];
  salle:Salle[]=[];
  user:User[]=[];
  // campus
  affectation :any = [];
  // salles
  affectationS: any= [];
  // users
  affectationU :any = [];

  onCampusChange(event:any){
    const selectedCampus = event.target.value;
    if(selectedCampus){
      this.getSalles(selectedCampus);
    }else {
      console.log("error")
    }
  }
  ngOnInit() {
    this.getAllAffectationForNT();
    this.getCampus();
    this.getTypeMateriels();
    //this.onTypeMaterielChange(event);
    this.getMateriels(this.onTypeMaterielChange(event));
    this.getSalles(this.onCampusChange(event));
    this.getUser();
    this.affectation = new Affectation();
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

  getSalles($id:any){
    this.salleService.getSalleByCampus($id).subscribe(res =>{
      this.salle = res ;
    });
  }

  constructor(private notification: ToastrService, private router: Router,private affectationService:AffectationService,private materielService : MaterielService, private userService:UserService,private salleService: SalleService ,private typeMatService : TypeMaterielService,private campusService:CampusService) {
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

  resetForm(){
    this.affectation.nomTable = "";
    this.affectation.quantite = null
    this.affectation.idMateriel = null;
    this.affectation.concerne_id = null;
  }



}
