import {Component, OnInit} from '@angular/core';
import {Materiel} from "../../../model/materiel";
import {ActivatedRoute} from "@angular/router";
import {MaterielService} from "../../../service/materiel.service";
import {TypeMateriel} from "../../../model/type-materiel";
import {TypeMaterielService} from "../../../service/type-materiel.service";

@Component({
  selector: 'app-edittype-materiel',
  templateUrl: './edittype-materiel.component.html',
  styleUrls: ['./edittype-materiel.component.css']
})
export class EdittypeMaterielComponent implements OnInit{

  typeMateriel!: TypeMateriel;

  constructor(private route:ActivatedRoute,private typeMaterielService:TypeMaterielService) {
  }

  getTMaterielById(){
    this.typeMaterielService.getTypeMaterielById(this.route.snapshot.params['id']).subscribe(res =>{
      this.typeMateriel=res;
    })
  }



  ngOnInit() {
    this.getTMaterielById();
  }
}
