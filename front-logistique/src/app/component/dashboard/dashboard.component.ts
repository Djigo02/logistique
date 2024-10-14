import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AffectationService} from "../../service/affectation.service";
import {MaterielService} from "../../service/materiel.service";
import {SalleService} from "../../service/salle.service";
import {CampusService} from "../../service/campus.service";
import {RoleService} from "../../service/role.service";
import {DemandeService} from "../../service/demande.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  // Utilisateur authentifier
  user: any | null = null;
  countMEVA!:Object;
  count!:number;

  constructor(
    private notif: ToastrService,
    private affectationService:AffectationService,
    private materielService:MaterielService,
    private salleService:SalleService,
    private campusService: CampusService,
    private role: RoleService,
    private demandeService: DemandeService
  ) {}

  tabAffectation!:any[];
  ngOnInit(): void {
    this.getMEVA();
    this.getDENC();
    this.materielsAffectes('salles');
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.role.getRoleByIdRole(this.user.idRole).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  getDENC(){
    this.demandeService.getdemande().subscribe(res =>{
      this.count= res.length;
    })
  }

  getMEVA(){
    this.materielService.getMEVA().subscribe(res => {
      this.countMEVA = res;
    });
  }


  /*
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  * Fonction a ne pas toucher
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */
  materielsAffectes(nomtable:string){
    // ! Liste des affectations des materiels par salles
    this.affectationService.getAffectationFNT(nomtable).subscribe(
      res => {
        this.tabAffectation = res;
        // ! Trier les affectations en onctions de l'emplacement pour chaque materiels
        // ? tab est la table qui va stocker le materiel et les salles ou ils se trouvent
        let tab = [];
        for (let i = 0; i <this.tabAffectation.length; i++) {
          //? Si le materiel a deja ete afficher on cherche les autres qui n'ont pas ete afficher
          let trouve = false;
          for (let j = 0; j < i ; j++) {
            if (this.tabAffectation[i].idMateriel == this.tabAffectation[j].idMateriel) {
              trouve = true;
              break;
            }
          }

          // ? Si le materiels n'a pas ete afficher on l'ajoute dans la table tab
          if (!trouve) {
            let result = [];
            for (let j = 0; j < this.tabAffectation.length ; j++) {
              if (this.tabAffectation[i].idMateriel == this.tabAffectation[j].idMateriel) {
                result.push(this.tabAffectation[i])
              }
            }
            tab.push({name:this.tabAffectation[i].materiel.description,result:result});
          }

        }

        tab.forEach( e => {
          e.result.forEach(el =>{
            this.campusService.getCampusById(el.concerne.idCampus).subscribe(
              campus => {
                el.campus = campus.nomCampus;
              }
            );
          })
        });

        this.tabAffectation = tab;
      },
      err => {
        this.notif.error('Une erreur s\'est produite', 'Erreur');
      }
    )
  }
}
