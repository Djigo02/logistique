export class Materiel {
  id!: number;
  reference!: string;
  codeMateriel!: string;
  description!: string;
  prix!: number;
  quantite!: number;
  seuil!: number;
  amortissement!: Date;
  dateEnregistrement!: Date;
  etat!: string;
  image!: string;
  idTypeMateriel!: number;
}