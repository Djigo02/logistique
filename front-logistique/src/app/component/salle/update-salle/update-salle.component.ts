import {Component, OnInit} from '@angular/core';
import {Salle} from "../../../model/salle";
import {SalleService} from "../../../service/salle.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-salle',
  templateUrl: './update-salle.component.html',
  styleUrls: ['./update-salle.component.css']
})
export class UpdateSalleComponent implements OnInit {
  salle!: Salle;
  constructor(private salleService:SalleService, private url:ActivatedRoute) { }
  ngOnInit(): void {
    this.salle = new Salle();
    const id = this.url.snapshot.params['id'];
    this.salleService.getSalleById(id).subscribe(data => {
      this.salle = data;
      console.log(this.salle);
    });
  }
}
