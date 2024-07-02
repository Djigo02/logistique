import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.css']
})
export class UtilisateurEditComponent implements OnInit{
  useer!:User;

  constructor(private route:ActivatedRoute,private userService:UserService) {
  }
  ngOnInit() {
   this.getUserById();
  }

  getUserById(){
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe(res =>{
      this.useer = res;
    });
  }
}
