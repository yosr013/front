import { Taille } from "./taille";

export class Article {
    id!:number;
    libelle!:string;
    theme!:string;
    prixFacon!:number;
    prixFini!:number;
    couleur!:string;
    modele!:string;
    tailles!:Taille[];
}
