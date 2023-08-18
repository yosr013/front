import { Article } from "./article";
import { Client } from "./client";

export class Commande {
    id!:number;
    dateEntree!:Date;
    dateLivraison!:Date;
    qte!:number;
    article!:Article;
    client!:Client;
    saison!:string;
    ref!:string;
    etat!:number;
}
