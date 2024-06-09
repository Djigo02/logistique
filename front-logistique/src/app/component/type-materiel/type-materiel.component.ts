import { Component, OnInit } from '@angular/core';
import { TypeMaterielServiceService } from 'src/app/serv/type-materiel-service.service';
import { TypeMateriel } from 'src/app/model/type-materiel';

@Component({
  selector: 'app-type-materiel',
  templateUrl: './type-materiel.component.html',
  styleUrls: ['./type-materiel.component.css'],
})
export class TypeMaterielComponent implements OnInit {
  typeMateriel!: TypeMateriel;
  typeMateriels!: TypeMateriel[];
  constructor(private typeMaterielService: TypeMaterielServiceService) {}

  ngOnInit(): void {
    this.getTypeMateriel();
  }

  getTypeMateriel() {
    this.typeMaterielService.getAllTypeMateriels().subscribe((res) => {
      this.typeMateriels = res;
    });
  }

  insertTypeMateriel() {
    this.typeMaterielService
      .insertTypeMateriel(this.typeMateriel)
      .subscribe((res) => {
        this.getTypeMateriel();
      });
  }
}
