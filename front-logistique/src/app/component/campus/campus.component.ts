
import {CampusService} from '../../service/campus.service'
import {Campus} from "src/app/model/campus"
import { Component, OnInit  } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";


@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent {

  campus!: Campus;
}
