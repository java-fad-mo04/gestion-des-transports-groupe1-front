 export class Geometry {
  public coordiantes: number[];
}
 export class Properties {
  public label: string;

}

export class Features {
  public geometry: Geometry;
  public properties: Properties;
}

export class Adresse {
  public features: Features;
}
