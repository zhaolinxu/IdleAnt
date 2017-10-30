import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, Research, TimeWarp, UpAction, UpHire, UpSpecial } from '../units/action';
import { Base } from '../units/base';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Prestige implements WorldInterface {

  experience: Unit

  expLists = new Array<TypeList>()
  expAnt = new Array<Unit>()
  expFollower = new Array<Unit>()
  expMachinery = new Array<Unit>()
  expTech = new Array<Unit>()
  allPrestigeUp = new Array<Unit>()

  //  Ant Follower
  pAntPower: Unit
  pAntGeo: Unit
  pAntHunter1: Unit
  pAntHunter2: Unit
  pAntFungus: Unit
  pAntLum: Unit

  //  Ant Power
  pAntNext: Unit
  pGeologistNext: Unit
  pScientistNext: Unit
  pFarmerNext: Unit
  pCarpenterNext: Unit
  pLumberjackNext: Unit

  //    Prestige Machinery
  pMachineryPower: Unit

  //    Prestige Technology
  pComposter: Unit
  pRefinery: Unit
  pLaser: Unit
  pHydro: Unit
  pPlanter: Unit

  //  Supply
  supplyList: Array<Unit>

  //  Efficiency
  effList = new Array<Unit>()
  effListEng = new Array<Unit>()

  //  Time
  timeList = new Array<Unit>()
  time: Unit
  timeMaker: Unit
  timeBank: Unit

  constructor(public game: GameModel) { }


  public declareStuff() {

  }

  public initStuff() {
    const expIncrement = Decimal(1.3)

    this.experience = new Unit(this.game, "exp", "经验",
      "经验。 改变世界的时候体验升级不复位。", true)
    this.expLists = new Array<TypeList>()
    this.expAnt = new Array<Unit>()

    //#region Ants Power
    this.pAntPower = new Unit(this.game, "pap", "蚂蚁能力",
      "蚂蚁产生更多的30％的食物。", true)
    this.pAntGeo = new Unit(this.game, "pAntGeo", "地质学家能力",
      "地质学家生产加成30％的水晶。", true)
    this.pAntHunter1 = new Unit(this.game, "phunt1", "猎人能力",
      "猎人产生并消耗30％的资源。", true)
    this.pAntHunter2 = new Unit(this.game, "phunt2", "高级猎人能力",
      "高级猎人的产量和消耗的资源多达30％。", true)
    this.pAntFungus = new Unit(this.game, "paf", "农民能力",
      "农民产生并消耗30％更多的资源。", true)

    this.expAnt.push(this.pAntPower)
    this.expAnt.push(this.pAntGeo)
    this.expAnt.push(this.pAntHunter1)
    this.expAnt.push(this.pAntHunter2)
    this.expAnt.push(this.pAntFungus)

    this.expAnt.forEach(p => {
      this.allPrestigeUp.push(p)
      p.actions.push(new BuyAction(this.game, p,
        [new Cost(this.experience, Decimal(15), expIncrement)]))
      p.unlocked = true
    })

    this.game.baseWorld.littleAnt.prestigeBonusProduction.push(this.pAntPower)
    this.game.baseWorld.geologist.prestigeBonusProduction.push(this.pAntGeo)
    this.game.baseWorld.hunter.prestigeBonusProduction.push(this.pAntHunter1)
    this.game.baseWorld.advancedHunter.prestigeBonusProduction.push(this.pAntHunter2)
    this.game.baseWorld.farmer.prestigeBonusProduction.push(this.pAntFungus)

    this.expLists.push(new TypeList("蚂蚁", this.expAnt))

    //#endregion

    //#region Ants in next world
    this.pAntNext = new Unit(this.game, "pan", "蚂蚁跟随者",
      "开始新的世界时，拥有5个蚂蚁。", true)
    this.pGeologistNext = new Unit(this.game, "pgn", "地质学家追随者",
      "开始新的世界时，拥有5个地质学家。", true)
    this.pScientistNext = new Unit(this.game, "psn", "科学家追随者",
      "开始新的世界时，拥有5个科学家。", true)
    this.pFarmerNext = new Unit(this.game, "pfn", "农民追随者",
      "开始新的世界时，拥有5个农民。", true)
    this.pCarpenterNext = new Unit(this.game, "pcarn", "木匠跟随者",
      "开始新的世界时，拥有5个木匠。", true)
    this.pLumberjackNext = new Unit(this.game, "plumn", "伐木工追随者",
      "开始新的世界时，拥有5个伐木工人。", true)

    this.expFollower = [this.pAntNext, this.pGeologistNext, this.pScientistNext,
    this.pFarmerNext, this.pCarpenterNext, this.pLumberjackNext]
    this.expFollower.forEach(n => {
      this.allPrestigeUp.push(n)
      n.actions.push(new BuyAction(this.game, n,
        [new Cost(this.experience, Decimal(10), expIncrement)]))
    })

    this.game.baseWorld.littleAnt.prestigeBonusStart = this.pAntNext
    this.game.baseWorld.geologist.prestigeBonusStart = this.pGeologistNext
    this.game.science.student.prestigeBonusStart = this.pScientistNext
    this.game.baseWorld.farmer.prestigeBonusStart = this.pFarmerNext
    this.game.baseWorld.carpenter.prestigeBonusStart = this.pCarpenterNext
    this.game.baseWorld.lumberjack.prestigeBonusStart = this.pLumberjackNext

    this.expLists.push(new TypeList("蚂蚁关注者", this.expFollower))

    //#endregion

    //#region  Machinery
    this.expMachinery = new Array<Unit>()
    this.pMachineryPower = new Unit(this.game, "pMach", "机器能力",
      "机器的产量和消耗更多的30％的资源。", true)
    this.pMachineryPower.actions.push(new BuyAction(this.game, this.pMachineryPower,
      [new Cost(this.experience, Decimal(20), expIncrement)]))
    this.expMachinery.push(this.pMachineryPower)
    this.game.machines.listMachinery.forEach(m => m.prestigeBonusProduction.push(this.pMachineryPower))

    this.expLists.push(new TypeList("机器", this.expMachinery))

    //#endregion

    //#region Technology
    this.expTech = new Array<Unit>()
    this.pComposter = new Unit(this.game, "pComposter", "堆肥",
      "堆肥单元产生并消耗30％更多的资源。", true)
    this.pRefinery = new Unit(this.game, "pRefinery", "精炼",
      "精炼单元产生并消耗30％更多的资源。", true)
    this.pLaser = new Unit(this.game, "pLaser", "激光",
      "激光单元产生并消耗30％更多的资源。", true)
    this.pHydro = new Unit(this.game, "pHydro", "水培",
      "水培单元产生并消耗30％更多的资源。", true)
    this.pPlanter = new Unit(this.game, "pPlanter", "种植",
      "种植单元产生并消耗30％更多的资源。", true)

    this.expTech.push(this.pComposter)
    this.expTech.push(this.pRefinery)
    this.expTech.push(this.pLaser)
    this.expTech.push(this.pHydro)
    this.expTech.push(this.pPlanter)

    this.expTech.forEach(p => {
      p.actions.push(new BuyAction(this.game, p,
        [new Cost(this.experience, Decimal(30), expIncrement)]))
    })
    this.expLists.push(new TypeList("技术", this.expTech))

    this.game.machines.composterStation.prestigeBonusProduction.push(this.pComposter)
    this.game.baseWorld.composterAnt.prestigeBonusProduction.push(this.pComposter)

    this.game.machines.refineryStation.prestigeBonusProduction.push(this.pRefinery)
    this.game.baseWorld.refineryAnt.prestigeBonusProduction.push(this.pRefinery)

    this.game.machines.laserStation.prestigeBonusProduction.push(this.pLaser)
    this.game.baseWorld.laserAnt.prestigeBonusProduction.push(this.pLaser)

    this.game.machines.hydroFarm.prestigeBonusProduction.push(this.pHydro)
    this.game.baseWorld.hydroAnt.prestigeBonusProduction.push(this.pHydro)

    this.game.machines.plantingMachine.prestigeBonusProduction.push(this.pPlanter)
    this.game.baseWorld.planterAnt.prestigeBonusProduction.push(this.pPlanter)

    //#endregion

    //#region Supply
    const supplyMaterials = [
      this.game.baseWorld.food,
      this.game.baseWorld.crystal,
      this.game.baseWorld.soil,
      this.game.baseWorld.wood,
      this.game.baseWorld.sand
    ]
    supplyMaterials.forEach(sm => sm.prestigeBonusQuantityValue = Decimal(100))
    this.supplyList = supplyMaterials.map(sm =>
      new Unit(this.game, "supp_" + sm.id, sm.name + "供给",
        "开始新的世界时，有100 " + sm.name + "。", true))

    this.supplyList.forEach(n => {
      this.allPrestigeUp.push(n)
      n.actions.push(new BuyAction(this.game, n,
        [new Cost(this.experience, Decimal(12), expIncrement)]))
    })

    for (let i = 0; i < supplyMaterials.length; i++)
      supplyMaterials[i].prestigeBonusStart = this.supplyList[i]


    this.expLists.push(new TypeList("供给", this.supplyList))
    //#endregion

    //#region Efficiency
    this.effList = new Array<Unit>()
    const names = [
      "Composter", "Refinery", "Laser", "Hydroponics", "Planting"
    ]
    const effMatrix = [
      [
        [this.game.baseWorld.composterAnt, this.game.machines.composterStation]
      ],
      [
        [this.game.baseWorld.refineryAnt, this.game.machines.refineryStation]
      ],
      [
        [this.game.baseWorld.laserAnt, this.game.machines.laserStation]
      ],
      [
        [this.game.baseWorld.hydroAnt, this.game.machines.hydroFarm]
      ],
      [
        [this.game.baseWorld.planterAnt, this.game.machines.plantingMachine]
      ]
    ]

    for (let i = 0; i < 5; i++) {

      const eff = new Unit(this.game, "eff" + names[i], names[i],
        names[i] + " 单位消耗的资源减少5％。 最大-50％。", true)

      const ba = new BuyAction(this.game, eff,
        [new Cost(this.experience, Decimal(50), expIncrement)])

      ba.limit = Decimal(10)

      eff.actions.push(ba)

      effMatrix[i].forEach(u => u.forEach(u2 => u2.produces
        .filter(p => p.efficiency.lessThanOrEqualTo(0))
        .forEach(prod => {
          if (!prod.bonusList)
            prod.bonusList = new Array<[Base, decimal.Decimal]>()

          prod.bonusList.push([eff, Decimal(-0.05)])

        })
      ))

      this.effList.push(eff)
    }
    this.expLists.push(new TypeList("效率", this.effList))

    //#endregion

    //#region Efficiency 2
    this.effListEng = new Array<Unit>()

    this.game.engineers.listEnginer.forEach(eng => {

      const eff = new Unit(this.game, "effEng" + eng.id, eng.name,
        eng.name + " 消耗资源减少5％。 最大-50％。", true)

      const ba = new BuyAction(this.game, eff,
        [new Cost(this.experience, Decimal(50), expIncrement)])

      ba.limit = Decimal(10)

      eff.actions.push(ba)

      eng.produces.filter(p => p.efficiency.lessThanOrEqualTo(0))
        .forEach(prod => {
          if (!prod.bonusList)
            prod.bonusList = new Array<[Base, decimal.Decimal]>()
          prod.bonusList.push([eff, Decimal(-0.05)])
        })
      this.effListEng.push(eff)
    })

    this.expLists.push(new TypeList("工程", this.effListEng))
    //#endregion

    //#region Time
    this.time = new Unit(this.game, "ptime", "时间",
      "时间可以用来去未来。 一个时间单位对应于一秒钟。", true)

    this.timeMaker = new Unit(this.game, "ptimeMaker", "时间发生器",
      "时间发生器以现实生活速度的1/10生成时间。 它不受暂停和时间扭曲的影响。", true)
    this.timeMaker.percentage = 100
    this.timeMaker.alwaysOn = true

    this.timeBank = new Unit(this.game, "ptimeBank", "时间银行",
      "时间银行将最长存储时间增加1小时。 基地储存4小时。", true)

    this.timeMaker.actions.push(new BuyAction(this.game, this.timeMaker,
      [new Cost(this.experience, Decimal(25), expIncrement)]))

    this.timeBank.actions.push(new BuyAction(this.game, this.timeBank,
      [new Cost(this.experience, Decimal(100), expIncrement)]))

    this.game.actMin = new TimeWarp(this.game, Decimal(60), "Minutes")
    this.game.actHour = new TimeWarp(this.game, Decimal(3600), "Hours")

    this.time.actions.push(this.game.actMin)
    this.time.actions.push(this.game.actHour)
    this.time.actions.push(new TimeWarp(this.game, Decimal(3600 * 24), "Days"))

    this.time.addProductor(new Production(this.timeMaker, Decimal(0.1)))

    this.timeList = [this.time, this.timeMaker, this.timeBank]
    this.expLists.push(new TypeList("时间管理", this.timeList))
    //#endregion

    this.expLists.map(l => l.list).forEach(al => al.forEach(l => {
      l.unlocked = true
      l.showTables = false
      l.neverEnding = true
      l.actions.forEach(a => a.unlocked = true)
    }))
  }

  public addWorld() {
  }
}
