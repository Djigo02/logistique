import {Component, Input, OnInit} from '@angular/core';
import {TypeMateriel} from "../../model/type-materiel";
import {TypeMaterielService} from "../../service/type-materiel.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-type-materiel-form',
  templateUrl: './type-materiel-form.component.html',
  styleUrls: ['./type-materiel-form.component.css']
})
export class TypeMaterielFormComponent implements OnInit{
  @Input() typeMateriel!: any;
  typeMateriels!: any;
  isAddForm ! :boolean;

  onsubmit(){
    if(this.isAddForm){
      this.insertTypeMateriel();
    }else {
      this.update();
    }
  }


  constructor(private typeMaterielService: TypeMaterielService, private router:Router) {}

  ngOnInit(): void {
    this.typeMateriel = new TypeMateriel();
    this.getTypeMateriels();
    this.isAddForm = this.router.url.includes("typeMateriel");
  }


  insertTypeMateriel() {
    this.typeMaterielService.insertTypeMateriel(this.typeMateriel).subscribe(
      res =>{
        this.getTypeMateriels();
        console.table(this.typeMateriels);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Type materiel ajouté avec succès",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/listesTypemateriels']);

      },error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: " probleme lors de l'ajout ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );

  }

  update(){
    this.typeMaterielService.updateTypeMateriel(this.typeMateriel,this.typeMateriel.id).subscribe(res  => {
      this.typeMateriel=res;
      Swal.fire({
        position: "center",
        icon: "success",
        title: " Type materiel modifier avec success ",
        showConfirmButton: false,
        timer: 1500
      });
      this.getTypeMateriels();
      this.router.navigate(['/admin/listesTypemateriels']);
    },error => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: " probleme lors de la modification du Type materiel",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  getTypeMateriels(){
    this.typeMateriels = this.typeMaterielService.getTypeMateriel();
  }
  redirectTo(id : number){
    this.router.navigate(['/admin/matEdit',id]);
  }

}
