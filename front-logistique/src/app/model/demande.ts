export class Demande {
  id!: number;
  description!:string;
  dateDemande!:Date;
  statut!:string;
  typeDemande!:string;
  idDemandeur!:number | string;
}
