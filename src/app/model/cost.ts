import { first } from 'rxjs/operator/first';
import { any } from 'codelyzer/util/function';
import * as decimal from "break_infinity.js"
import { GameModel } from './gameModel';
import { GameService } from '../game.service';
import { Unit } from './units/unit';

export class Cost {
  constructor(
    public unit: Unit = null,
    public basePrice: decimal.Decimal = new Decimal(1),
    public growFactor: decimal.Decimal = new Decimal(1)) { }

  getData() {
    const data: any = {}
    data.u = this.unit.id
    data.b = this.basePrice
    data.g = this.growFactor
    return data
  }


}
