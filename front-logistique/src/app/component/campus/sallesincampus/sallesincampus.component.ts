import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {Campus} from "../../../model/campus";
import {Salle} from "../../../model/salle";

@Component({
  selector: 'app-sallesincampus',
  templateUrl: './sallesincampus.component.html',
  styleUrls: ['./sallesincampus.component.css']
})
export class SallesincampusComponent implements OnInit {

  focuscampus!:Campus;
  sallesincampus!: Salle[];

  constructor(private router:Router,private url: ActivatedRoute , private campusService:CampusService) { }
  ngOnInit() {
   this.getCampus();
   this.getSalles();
  }

  getSalles() {
    this.campusService.getSallesByCampusId(this.url.snapshot.params['id']).subscribe(data => {
      this.sallesincampus = data;
    });
  }

  getCampus() {
    this.campusService.getCampusById(this.url.snapshot.params['id']).subscribe(data => {
      this.focuscampus = data;
    });
  }
}
