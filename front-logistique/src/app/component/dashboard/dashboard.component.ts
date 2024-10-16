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
<<<<<<< HEAD
   tab = [];
=======
  countMEVA!:Object;
  count!:number;

>>>>>>> a153aa1ea7fe29dc778bbad67f7dce214e0a08bb
  constructor(
    private notif: ToastrService,
    private affectationService:AffectationService,
    private materielService:MaterielService,
    private salleService:SalleService,
    private campusService: CampusService,
    private role: RoleService,
<<<<<<< HEAD
    private demandeService:DemandeService
=======
    private demandeService: DemandeService
>>>>>>> a153aa1ea7fe29dc778bbad67f7dce214e0a08bb
  ) {}

  tabAffectation!:any[];
  countMEVA!:Object;
  count!:number;

  ngOnInit(): void {
    this.getMEVA();
    this.getDENC();
    this.materielsAffectes('salles');
    this.getMEVA();
    this.getDENC();
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
<<<<<<< HEAD

=======
>>>>>>> a153aa1ea7fe29dc778bbad67f7dce214e0a08bb


  /*
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  * Fonction a ne pas toucher
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */
  materielsAffectes(nomtable: string) {
    // Liste des affectations des materiels par salles
    this.affectationService.getAffectationFNT(nomtable).subscribe(
      res => {
        this.tabAffectation = res;
        let tab = []; // Utilise une nouvelle variable locale pour éviter les conflits

        // Trier les affectations en fonction de l'emplacement pour chaque matériel
        for (let i = 0; i < this.tabAffectation.length; i++) {
          let trouve = false;

          // Vérifie si le matériel a déjà été traité
          for (let j = 0; j < i; j++) {
            if (this.tabAffectation[i].idMateriel === this.tabAffectation[j].idMateriel) {
              trouve = true;
              break;
            }
          }

          // Si le matériel n'a pas été traité, on l'ajoute dans la nouvelle table
          if (!trouve) {
            let result = [];
            for (let j = 0; j < this.tabAffectation.length; j++) {
              if (this.tabAffectation[i].idMateriel === this.tabAffectation[j].idMateriel) {
                result.push(this.tabAffectation[j]); // Remplace i par j pour récupérer les bonnes données
              }
            }

            // Ajoute l'objet avec le nom du matériel et les résultats associés
            tab.push({
              name: this.tabAffectation[i].materiel.description,
              result: result
            });
          }
        }

        // Pour chaque matériel et chaque salle affectée, récupère le nom et l'idUser du campus
        tab.forEach(e => {
          e.result.forEach(el => {
            this.campusService.getCampusById(el.concerne.idCampus).subscribe(
              campus => {
                // Ajoute le nom du campus et l'idUser du campus à chaque élément
                el.campus = {
                  nomCampus: campus.nomCampus,  // Nom du campus
                  idUserr: campus.idUser          // idUser du campus
                };
              },
              err => {
                console.error('Erreur lors de la récupération du campus', err);
              }
            );
          });
        });

        // Mets à jour la table principale avec les données traitées
        this.tabAffectation = tab;
      },
      err => {
        this.notif.error("Une erreur s'est produite", "Erreur");
      }
    );
  }

}
