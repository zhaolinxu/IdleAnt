import { debounce } from 'rxjs/operator/debounce';
import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';

export class Engineers implements WorldInterface {

  composterEnginer: Unit
  laserEnginer: Unit
  hydroEnginer: Unit
  plantingEnginer: Unit
  refineryEnginery: Unit

  mineEnginer: Unit
  sandEnginer: Unit
  woodEnginer: Unit
  beeEnginer: Unit
  lensEnginer: Unit
  iceEngineer: Unit
  iceCompEngineer: Unit

  composterDep: Unit
  laserDep: Unit
  hydroDep: Unit
  plantingDep: Unit
  refineryDep: Unit

  mineDep: Unit
  sandDep: Unit
  woodDep: Unit
  beeDep: Unit
  lensDep: Unit
  iceDep: Unit
  iceCompDep: Unit

  listEnginer = new Array<Unit>()
  listDep = new Array<Unit>()

  constructor(public game: GameModel) { }

  declareStuff() {
    this.listEnginer = new Array<Unit>()

    this.composterEnginer = new Unit(this.game, "engCo", "堆肥工程师",
      "慢慢地建立堆肥站。")
    this.laserEnginer = new Unit(this.game, "engLa", "激光工程师",
      "慢慢地建立激光站。")
    this.hydroEnginer = new Unit(this.game, "engHy", "水培工程师",
      "慢慢地建立水培农场。")
    this.plantingEnginer = new Unit(this.game, "engSo", "种植工程师",
      "慢慢地建立种植机。")
    this.refineryEnginery = new Unit(this.game, "engRef", "精炼工程师",
      "慢慢地建立精炼站。")

    this.mineEnginer = new Unit(this.game, "engMi", "采矿工程师",
      "慢慢建立矿井。")
    this.sandEnginer = new Unit(this.game, 'engSa', "挖沙工程师",
      '慢慢地建立沙挖掘机。')
    this.woodEnginer = new Unit(this.game, "engWo", "伐木工程师",
      "慢慢地建立伐木机。")
    this.beeEnginer = new Unit(this.game, "engBee", "蜜蜂工程师",
      "慢慢地建立蜂蜜制造商。")
    this.iceEngineer = new Unit(this.game, "engIce", "冰块工程师",
      "慢慢地建立水箱。")
    this.iceCompEngineer = new Unit(this.game, "engIceComp", "压冰工程师",
      "慢慢地建立冰压实机。")
    this.lensEnginer = new Unit(this.game, "lensEnginer", "燃烧镜头工程师",
      "慢慢地建立燃烧镜头。")

    this.sandEnginer.avabileBaseWorld = false
    this.mineEnginer.avabileBaseWorld = false
    this.woodEnginer.avabileBaseWorld = false
    this.beeEnginer.avabileBaseWorld = false
    this.iceEngineer.avabileBaseWorld = false
    this.iceCompEngineer.avabileBaseWorld = false
    this.lensEnginer.avabileBaseWorld = false

    this.listEnginer.push(this.composterEnginer)
    this.listEnginer.push(this.refineryEnginery)
    this.listEnginer.push(this.laserEnginer)
    this.listEnginer.push(this.hydroEnginer)
    this.listEnginer.push(this.plantingEnginer)
    this.listEnginer.push(this.sandEnginer)
    this.listEnginer.push(this.woodEnginer)
    this.listEnginer.push(this.mineEnginer)
    this.listEnginer.push(this.beeEnginer)
    this.listEnginer.push(this.iceCompEngineer)
    this.listEnginer.push(this.iceEngineer)
    this.listEnginer.push(this.lensEnginer)

    this.game.lists.push(new TypeList("工程师", this.listEnginer))

    this.composterDep = new Unit(this.game, "depaCo", "堆肥部门",
      "产生工程师。")
    this.laserDep = new Unit(this.game, "depaLa", "激光部门",
      "产生工程师。")
    this.hydroDep = new Unit(this.game, "depaHy", "水培部门",
      "产生工程师。")
    this.plantingDep = new Unit(this.game, "depaSo", "种植部门",
      "产生工程师。")
    this.refineryDep = new Unit(this.game, "depaRef", "精炼部门",
      "产生工程师。")

    this.mineDep = new Unit(this.game, "depaMi", "采矿部门",
      "产生工程师。")
    this.sandDep = new Unit(this.game, 'depaSa', "挖沙部门",
      '产生工程师。')
    this.woodDep = new Unit(this.game, "depaWo", "伐木部门",
      "产生工程师。")
    this.beeDep = new Unit(this.game, "depaBee", "蜜蜂部门",
      "产生工程师。")
    this.iceDep = new Unit(this.game, "depaIce", "采冰部门",
      "产生工程师。")
    this.iceCompDep = new Unit(this.game, "depaIceComp", "压缩部门",
      "产生工程师。")
    this.lensDep = new Unit(this.game, "depaEnginer", "燃烧镜头部门",
      "产生工程师。")

    this.sandDep.avabileBaseWorld = false
    this.mineDep.avabileBaseWorld = false
    this.woodDep.avabileBaseWorld = false
    this.beeDep.avabileBaseWorld = false
    this.iceDep.avabileBaseWorld = false
    this.iceCompDep.avabileBaseWorld = false
    this.lensDep.avabileBaseWorld = false

    this.listDep.push(this.composterDep)
    this.listDep.push(this.refineryDep)
    this.listDep.push(this.laserDep)
    this.listDep.push(this.hydroDep)
    this.listDep.push(this.plantingDep)
    this.listDep.push(this.sandDep)
    this.listDep.push(this.woodDep)
    this.listDep.push(this.mineDep)
    this.listDep.push(this.beeDep)
    this.listDep.push(this.iceCompDep)
    this.listDep.push(this.iceDep)
    this.listDep.push(this.lensDep)

    this.game.lists.push(new TypeList("部门", this.listDep))
  }
  initStuff() {

    this.listEnginer.forEach(e => {
      e.actions.push(new BuyAction(this.game,
        e,
        [
          new Cost(this.game.baseWorld.littleAnt, Decimal(1E4), this.game.buyExpUnit),
          new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.buyExp)
        ]
      ))
      e.actions.push(new UpAction(this.game, e,
        [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))
      e.actions.push(new UpHire(this.game, e,
        [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceHireExp)]))
    })


    for (let i = 0; i < this.listEnginer.length; i++) {
      const engineer = this.listEnginer[i]
      const machine = this.game.machines.listMachinery[i]

      machine.addProductor(new Production(engineer, Decimal(0.01)))
      this.game.baseWorld.science.addProductor(new Production(engineer, Decimal(-200)))

      machine.buyAction.priceF.forEach(price => {
        price.unit.addProductor(new Production(engineer, price.basePrice.div(-50)))
        engineer.buyAction.priceF.push(new Cost(price.unit, price.basePrice.times(5), this.game.buyExpUnit))
      })
    }

    //  Bee engineer should actually be a Bee
    this.beeEnginer.buyAction.priceF = [
      new Cost(this.game.bee.foragingBee, Decimal(1E4), this.game.buyExpUnit),
      new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.buyExp)
    ]

    this.beeEnginer.upAction.priceF[0].basePrice = this.beeEnginer.upAction.priceF[0].basePrice.times(0.8)
    this.beeEnginer.upHire.priceF[0].basePrice = this.beeEnginer.upHire.priceF[0].basePrice.times(0.8)

    //  departments
    for (let i = 0; i < this.listEnginer.length; i++) {
      const engineer = this.listEnginer[i]
      const machine = this.game.machines.listMachinery[i]
      const dep = this.listDep[i]

      engineer.addProductor(new Production(dep, Decimal(1)))
      this.game.baseWorld.science.addProductor(new Production(dep, Decimal(-2000)))

      dep.actions.push(new BuyAction(this.game,
        dep,
        [
          new Cost(this.game.science.university, Decimal(1), this.game.buyExpUnit),
          new Cost(engineer, Decimal(100), this.game.buyExp),
          new Cost(machine, Decimal(1E4), this.game.buyExp)
        ]
      ))

    }
  }
  addWorld() {
  }
}
