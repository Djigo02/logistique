import {Component, OnInit} from '@angular/core';
import {AffectationService} from "../../../service/affectation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-transfert-materiel-use',
  templateUrl: './transfert-materiel-use.component.html',
  styleUrls: ['./transfert-materiel-use.component.css']
})
export class TransfertMaterielUseComponent implements OnInit {
  affectation!:any;
  constructor(private affectationService: AffectationService, private url: ActivatedRoute) { }
  ngOnInit(): void {

    const id = this.url.snapshot.params['id'];
    this.affectationService.getAffectationById(id).subscribe(data => {
      this.affectation = data;
      this.affectation.idAncien=this.affectation.id;
      console.log(this.affectation);
    });
  }
}
