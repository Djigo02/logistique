import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import {Component, Input, OnInit} from '@angular/core';
import { Materiel } from 'src/app/model/materiel';
import { MaterielService } from 'src/app/service/materiel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMateriel } from 'src/app/model/type-materiel';
import { TypeMaterielService } from 'src/app/service/type-materiel.service';
import {Fournisseur} from "../../model/fournisseur";
import {FournisseurService} from "../../service/fournisseur.service";

@Component({
  selector: 'app-materiel-form',
  templateUrl: './materiel-form.component.html',
  styleUrls: ['./materiel-form.component.css']
})
export class MaterielFormComponent {
  @Input() materiel! : any;
  typM! : TypeMateriel;
  selectedFile:File | null=null;
  TypeMateriels : TypeMateriel[] =[];
  fournisseurs : Fournisseur[] =[];
  isAddForm!:boolean;
  fournisseur!:any;
  constructor(private materielService : MaterielService ,private router : Router,private fournisseurService : FournisseurService,private typeMatServ:TypeMaterielService){}

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
      this.router.navigate(['admin/listesmateriels']);
    }, error => {
      console.error('Erreur lors de l\'enregistrement du matériel:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du matériel.');
    });
  }

  insertFournisseur(){
    this.fournisseurService.insertFournisseur(this.fournisseur).subscribe(res =>{
      alert('fournisseur ajouter avec succes');

    }, error => {
      console.error('Erreur lors de l\'enregistrement du fournisseur:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du fournisseur.');
    })
  }

  updateMateriel(){
    this.materielService.updateTypeMateriel(this.materiel,this.materiel.id).subscribe(res =>
    {
      this.getMaterielData();
      this.router.navigate(['admin/listesmateriels']);
    },error => {
        console.error('Erreur lors de la modifiacation du matériel:', error);
        alert('Une erreur est survenue lors de modifiacation du matériel.');
      }
      );
  }

  onSubmit(){
      if(this.isAddForm){
        this.insertMateriel();
      }else{
        this.updateMateriel();
      }
  }

  getMaterielData() {
    this.materielService.getMateriel().subscribe(res => {
      this.materiel = res;
    });
  }

  loadTypeMate(){
    this.typeMatServ.getAllTypeMateriels().subscribe(res => {
      if(res != null){
        this.TypeMateriels = res;
      }

    });
  }

  loadFounisseurs(){
    this.fournisseurService.getAllFournisseur().subscribe(res =>{
      if(res != null){
        this.fournisseurs = res;
      }
    })
  }

  ngOnInit(): void {
    this.materiel = new Materiel();
    this.fournisseur = new Fournisseur();
    this.loadTypeMate();
    this.loadFounisseurs();
    this.isAddForm = this.router.url.includes('materiel');

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
