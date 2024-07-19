import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMateriel } from 'src/app/model/type-materiel';
import { TypeMaterielService } from 'src/app/service/type-materiel.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-type-materiel',
  templateUrl: './type-materiel.component.html',
  styleUrls: ['./type-materiel.component.css'],
})
export class TypeMaterielComponent implements OnInit {
  typeMateriel!: TypeMateriel;
  typeMateriels!: any;
  constructor(private typeMaterielService: TypeMaterielService, private router:Router,private notification:ToastrService) {}

  ngOnInit(): void {
    this.typeMateriel = new TypeMateriel();
  }


  insertTypeMateriel() {
    this.typeMaterielService.insertTypeMateriel(this.typeMateriel).subscribe(
      res =>{
        this.getTypeMateriels();
        console.table(this.typeMateriels);
        this.notification.success(`type materiel ajoute avec success`,"Operation success");
        this.router.navigate(['/admin/campus']);
      }
    );

  }

  getTypeMateriels(){
    this.typeMateriels = this.typeMaterielService.getTypeMateriel();
  }

  protected readonly onsubmit = onsubmit;
}
