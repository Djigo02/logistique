import { Component, OnInit } from '@angular/core';
import { Demande } from '../../model/demande';
import { DemandeService } from '../../service/demande.service';
import { RoleService } from '../../service/role.service';
import Swal from 'sweetalert2';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-all-demande',
  templateUrl: './all-demande.component.html',
  styleUrls: ['./all-demande.component.css'],
})
export class AllDemandeComponent implements OnInit {
  demandesu: Demande[] = [];
  filteredDemandes: Demande[] = [];
  user: any;
  selectedStatus: string = '';
  demandeurs!: any; // Stocke les utilisateurs demandeurs

  constructor(
    private demandeService: DemandeService,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadAllDemandes();
    this.preloadAllDemandeurs();
  }

  loadAllDemandes(): void {
    this.demandeService.getDemandes().subscribe(
      (res) => {
        this.demandesu = res;
        this.filteredDemandes = this.demandesu; // Initialisation de la liste filtrée
      },
      (error) => {
        console.error('Erreur lors du chargement des demandes', error);
      }
    );
  }

  filterByStatus(): void {
    this.filteredDemandes = this.selectedStatus
      ? this.demandesu.filter((dem) => dem.statut === this.selectedStatus)
      : this.demandesu; // Récupère toutes les demandes si aucun statut n'est sélectionné
  }

  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.roleService.getRoleByIdRole(this.user.idRole).subscribe(
        (res) => {
          this.user.roleName = res.roleData.libelle;
        },
        (error) => {
          console.error('Erreur lors de la récupération du rôle', error);
        }
      );
    }
  }

  updateDemande(demande: Demande): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Modifier!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.updateDemande(demande.id, demande).subscribe(
          () => {
            this.loadAllDemandes(); // Recharge toutes les demandes après la mise à jour
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Demande mise à jour avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            this.showErrorAlert(`Erreur lors de la mise à jour de la demande ${error}.`);
          }
        );
      }
    });

  }

  accept(id: number): void {
    this.updateDemandeStatus(id, 'acceptee');
  }

  refuse(id: number): void {
    this.updateDemandeStatus(id, 'refusee');
  }

  updateDemandeStatus(id: number, newStatus: string): void {
    this.demandeService.getDemande(id).subscribe(
      (res) => {
        res.statut = newStatus;
        this.updateDemande(res);
      },
      () => {
        this.showErrorAlert("Erreur lors de la mise à jour de la demande.");
      }
    );
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // Charge les informations des utilisateurs demandeurs à l'initialisation
  preloadAllDemandeurs(): void {
    this.userService.getUsers().subscribe(
      (res:User[]) => {
        // Stocker tous les utilisateurs demandeurs dans un objet pour un accès rapide
        this.demandeurs = res;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  isSameCampus(demande: Demande): boolean {
    // Trouve le demandeur correspondant dans la liste
    const demandeur = this.demandeurs.find((us:User) => us.id === demande.idDemandeur)

    if (!demandeur || !this.user) {
      return false; // Si le demandeur ou l'utilisateur actuel n'existe pas
    }

    // Compare les campus
    return demandeur.campus_id === this.user.campus_id;
  }
}
