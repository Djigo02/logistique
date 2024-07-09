import {Component, OnInit} from '@angular/core';
import {Campus} from "../../../model/campus";
import {ActivatedRoute} from "@angular/router";
import {CampusService} from "../../../service/campus.service";

@Component({
  selector: 'app-update-campus',
  templateUrl: './update-campus.component.html',
  styleUrls: ['./update-campus.component.css']
})
export class UpdateCampusComponent implements OnInit {
  campus!: Campus;
  constructor(private url:ActivatedRoute, private campusService:CampusService) { }

  ngOnInit(){
    const id = this.url.snapshot.params['id'];
    this.campusService.getCampusById(id).subscribe(data => {
      this.campus = data;
    });
  }
}
