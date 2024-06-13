import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Materiel } from 'src/app/model/materiel';


@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {

  materiel! : any;

  ngOnInit(): void {
    this.materiel = new Materiel();
  }
}
