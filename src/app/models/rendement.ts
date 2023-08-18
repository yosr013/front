import { Employe } from "./employe";

export class Rendement {

    id!:number;
    date!:Date;
    nbrePiProduites!:number;
    tempsOpe!:number;
    tempsOpeEs!:number;
    tempsPre!:number;
    rendement!:number;
    rendementEs!:number;
    employe!:Employe;
    dateDebut!:Date;
    dateFin!:Date;
}
