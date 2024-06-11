import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Materiel } from 'src/app/model/materiel';
import { MaterielService } from 'src/app/service/materiel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMateriel } from 'src/app/model/type-materiel';
import { TypeMaterielService } from 'src/app/service/type-materiel.service';
@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {

  materiel! : Materiel;
  mat:any;
  typM! : TypeMateriel;
  selectedFile:File | null=null;
  TypeMateriels : TypeMateriel[] =[];
  constructor(private materielService : MaterielService,private router : Router,private typeMatServ:TypeMaterielService){}

  /** 
  * la fonction est lier a un evenment de change dans leninout file qui recupere l;image il vas recuperer le premier file et le stocker dans 
  * selectedFile
  */
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  insertMateriel() {
    // Log toutes les valeurs du matériel dans la console
    console.log('Materiel data:', this.materiel);

    // Insérer le matériel en utilisant le service
    this.materielService.insertMateriel(this.materiel).subscribe(res => {
      // Rafraîchir les données du matériel
      this.getMaterielData();
      // Rediriger vers la page d'administration du campus
      this.router.navigate(['admin/campus']);
    }, error => {
      console.error('Erreur lors de l\'enregistrement du matériel:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du matériel.');
    });
  }

  getMaterielData() {
    this.materielService.getTypeMateriel().subscribe(res => {
      this.mat = res;
    });
  }

  loadTypeMate(){
    this.typeMatServ.getAllTypeMateriels().subscribe(res => {
      if(res != null){
        this.TypeMateriels = res;
      }
      console.log(this.TypeMateriels);
    });
  }

  ngOnInit(): void {
    this.materiel = new Materiel();

     this.loadTypeMate();


    // @ts-ignore
    $('.dropify').dropify({
      messages: {
        default: 'Drag and drop a file here or click',
        replace: 'Drag and drop or click to replace',
        remove: 'Remove',
        error: 'Ooops, something wrong appended.',
      },
      error: {
        fileSize: 'The file size is too big (2M max).',
      },
    });
  }
}
