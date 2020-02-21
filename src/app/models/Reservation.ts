import { Collegue } from "../auth/auth.domains";
import { Vehicule } from "./Vehicule";

export interface Reservation {
  id?: number;
  date?: Date;
  collegue?: Collegue;
  depart?: string;
  destination?: string;
  passagers?: Collegue[];
  vehicule?: Vehicule;
  chauffeur?: Collegue;
  presenceChauffeur?: boolean;
}
