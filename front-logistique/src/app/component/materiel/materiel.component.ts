import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {
  ngOnInit(): void {
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
