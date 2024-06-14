import {Component, OnInit} from '@angular/core';
import {Materiel} from "../../../model/materiel";
import {ActivatedRoute} from "@angular/router";
import {MaterielService} from "../../../service/materiel.service";

@Component({
  selector: 'app-materiel-edit',
  templateUrl: './materiel-edit.component.html',
  styleUrls: ['./materiel-edit.component.css']
})
export class MaterielEditComponent implements OnInit{

  materiel!: Materiel;

  constructor(private route:ActivatedRoute,private materielService:MaterielService) {
  }

  getMaterielById(){
    this.materielService.getTypeMaterielById(this.route.snapshot.params['id']).subscribe(res =>{
      this.materiel=res;
    })
  }



  ngOnInit() {
    this.getMaterielById();
  }
}
