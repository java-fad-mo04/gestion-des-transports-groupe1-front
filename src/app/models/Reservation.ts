
import { Vehicule } from './Vehicule';
import { Collegue } from './Collegue';

export class Reservation {
  public id?: number;
  public date?: string;
  public collegue?: Collegue;
  public depart?: string;
  public destination?: string;
  public passagers?: Collegue[];
  public vehicule?: Vehicule;
  public chauffeur?: Collegue;
  public presenceChauffeur?: boolean;
}
