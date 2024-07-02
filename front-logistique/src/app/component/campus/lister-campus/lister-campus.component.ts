import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CampusService} from "../../../service/campus.service";
import {Campus} from "../../../model/campus";

@Component({
  selector: 'app-lister-campus',
  templateUrl: './lister-campus.component.html',
  styleUrls: ['./lister-campus.component.css']
})
export class ListerCampusComponent implements OnInit{

  campusList!: Campus[];

  ngOnInit() {
    this.getCampus();
  }

  constructor(private router:Router, private campusService:CampusService) {
  }

  getCampus(){
    this.campusService.getCampus().subscribe(data => {
      this.campusList = data;
      console.log(this.campusList);
    });
  }

  goToCampusForm(){
    this.router.navigate(['/admin/campus']);
  }
}
