import { Commande } from "./commande";
import { Gamme } from "./gamme";

export class OrdreFab {
    id!:number;
    dateFab!:Date;
    dateFin!:Date;
    qteParTailles!:string;
    commande!:Commande;
    gamme!:Gamme;
    ref!:string;
}
