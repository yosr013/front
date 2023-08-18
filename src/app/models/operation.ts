import { Machine } from "./machine";
import { Phase } from "./phase";

export class Operation {
    id!:number;
    nom!:string;
    temps!:number
    code!:number
    machine!:Machine
    phase!:Phase
}
