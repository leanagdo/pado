
export class Fuel {
  public voiture : string;
  public date : string;
  private _dateType : Date;
  public kilometrage : string;
  public montant : string;
  public litre : string;
  public carburant : string;

  constructor(
    

  ) {}

  set dateType(dateType: Date) {
    this._dateType = dateType;
  }

  get dateType(): Date {
    return new Date(this.date);
  }

   

 }