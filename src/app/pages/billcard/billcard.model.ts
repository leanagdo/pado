
export class BillCard {
  public carte : string;
  public categorie : string;
  public date : string;
  public description : string;
  public montant : string;
  public ordre : string;
  private _dateType : Date;

  constructor(
  ) {}

  set dateType(dateType: Date) {
    this._dateType = dateType;
  }

  get dateType(): Date {
    return new Date(this.date);
  }

 }
