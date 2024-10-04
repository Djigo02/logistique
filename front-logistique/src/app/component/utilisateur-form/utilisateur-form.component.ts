import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {RoleService} from "../../service/role.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CampusService} from "../../service/campus.service";

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit{

  @Input() user!: any;
  utilisateur!: any;
  rolesList!: Role[];
  isAddForm !: boolean;
  utilisateurs :User[]=[];
  role!:Role;
  campusList!: any;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private campusService: CampusService,
    private notification : ToastrService,
  ) {}


  isCampusInvalid = false;

  validateCampusSelection() {
    if (this.user.campus_id === null || this.user.campus_id === '') {
      this.isCampusInvalid = true;
    } else {
      this.isCampusInvalid = false;
    }
  }

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
    this.getCampusData();
    this.isAddForm = this.router.url.includes("utilisateur");

    const userData = localStorage.getItem("user");
    if (userData) {
      this.utilisateur = JSON.parse(userData);
      this.roleService.getRoleByIdRole(this.user.idRole).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  onSubmit(){
    if(this.isAddForm){
      this.handleSubmit();
    }else{
      this.updateUser();
    }
  }

  getUserData(){
    this.userService.getUsers().subscribe(res =>{
      this.utilisateurs = res;
      console.log(res);
    });
  }

  getCampusData(){
    this.campusService.getCampus().subscribe(res => {
      this.campusList = res ;
    });
  }



  handleSubmit() {
    this.userService.insertUser(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.notification.success("Utilisateur ajoutee avec succcess","Operation reussie");
        this.router.navigate(['admin/listesutilisateurs']);
        this.user = new User();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
        this.notification.error("Erreur lors de l'ajout de l'utilisateur","Operation echouee");
      },
    });

  }
  updateUser(){
    this.userService.updateUser(this.user,this.user.id).subscribe(res =>{
      this.getUserData();
      this.notification.success("Utilisateur modifiee avec succcess","Operation reussie");
      this.router.navigate(['admin/listesutilisateurs']);

    },error => {
      this.notification.error("Erreur lors de la modification de l'utilisateur","Operation echouee");
    }
  );
  }

}
