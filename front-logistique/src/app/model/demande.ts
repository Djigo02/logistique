export class Demande {
  id!: number;
  description!:string;
  dateDemande!:Date;
  statut!:string;
  objet!:string;
  idDemandeur!:number | string;
}
