import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {RoleService} from "../../service/role.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit{

  @Input() user!: User;
  rolesList!: Role[];
  isAddForm !: boolean;
  utilisateurs :User[]=[];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
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
    this.isAddForm = this.router.url.includes("utilisateur");
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

  handleSubmit() {
    this.userService.insertUser(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    alert(`Utilisateur ajoutee : ${this.user.email}`);
    this.router.navigate(['admin/listesutilisateurs']);
  }
  updateUser(){
    this.userService.updateUser(this.user,this.user.id).subscribe(res =>{
      this.getUserData();
      this.router.navigate(['admin/listesutilisateurs']);

    },error => {
      console.error('Erreur lors de la modifiacation du matériel:', error);
      alert('Une erreur est survenue lors de modifiacation du matériel.');
    }
  );
  }

}
