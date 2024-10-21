import { Component, OnInit } from '@angular/core';
import { Demande } from '../../model/demande';
import { DemandeService } from '../../service/demande.service';
import { RoleService } from '../../service/role.service';
import Swal from 'sweetalert2';
import {UserService} from "../../service/user.service";

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

  constructor(
    private demandeService: DemandeService,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadAllDemandes();
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
  isSameCampus(demande: Demande): boolean {
    let sameCampus = false;
    this.userService.getUserById(demande.idDemandeur).subscribe(
      (res) => {
        sameCampus = res.campus_id === this.user.campus_id;
      },
      (error) => {
        console.error('Erreur lors de la récupération du demandeur', error);
      }
    );
    return sameCampus;
  }
}
