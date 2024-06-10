import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Materiel } from 'src/app/model/materiel';
import { MaterielService } from 'src/app/service/materiel.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {

  materiel! : Materiel;
  mat:any;
  constructor(private materielService : MaterielService,private router : Router){}
  insertMateriel(){
    this.materielService.insertMateriel(this.materiel).subscribe(res => {
      this.getMaterielData;
      this.router.navigate(['admin/campus']);
    })
  }

  getMaterielData(){
    this.materielService.getTypeMateriel().subscribe(res=>{
      this.mat =res;
    });
  }

  ngOnInit(): void {
    this.materiel = new Materiel();
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
