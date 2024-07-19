import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
})
export class UtilisateurComponent implements OnInit {
  user!: User;
  rolesList!: Role[];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private notification:ToastrService,
  ) {}

  ngOnInit() {
    this.user = new User();

    // Initialisation de la liste des rôles
    this.roleService.getRole().subscribe({
      next: (res) => {
        this.rolesList = res;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des rôles :', err);
      },
    });
  }

  handleSubmit() {
    this.userService.insertUser(this.user).subscribe({
      next: (res) => {

      },
    });
    this.notification.success("user  a ete ajoute avec succes","Operation reussie");
    this.router.navigate(['/admin/listesutilisateurs']);
  }
}
