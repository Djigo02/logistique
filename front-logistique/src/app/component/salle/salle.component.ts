import {Component, OnInit} from '@angular/core';
import {CampusService} from "../../service/campus.service";
import {SalleService} from "../../service/salle.service";
import {Router} from "@angular/router";
import {Campus} from "../../model/campus";
import {Salle} from "../../model/salle";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})

export class SalleComponent  {
  salle!:Salle;
}
