import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';
import { TogableProduction } from '../units/togableProductions';

export class Machine implements WorldInterface {

  //    Machinery
  composterStation: Unit
  refineryStation: Unit
  laserStation: Unit
  hydroFarm: Unit
  plantingMachine: Unit

  mine: Unit
  sandDigger: Unit
  loggingMachine: Unit
  honeyMaker: Unit
  burningGlass: Unit
  iceCollector: Unit
  iceCompacter: Unit

  listMachinery = new Array<Unit>()

  machineryProd = Decimal(500)
  machineryCost = Decimal(-150)

  price1 = Decimal(1E5)
  price2 = Decimal(6E4)
  price3 = Decimal(3E4)

  constructor(public game: GameModel) { }

  public declareStuff() {
    this.composterStation = new Unit(this.game, "composterStation", "堆肥站",
      "将木材转化为土壤。")
    this.refineryStation = new Unit(this.game, "refineryStation", "精炼站",
      "将土壤变成沙子。")
    this.laserStation = new Unit(this.game, "laserStation", "激光站",
      "生产水晶。")
    this.hydroFarm = new Unit(this.game, "hydroFarm", "水培场",
      "生产真菌。")
    this.plantingMachine = new Unit(this.game, "plantingMac", "种植机",
      "生产木材。")
    this.sandDigger = new Unit(this.game, "sandDigger", "挖沙机",
      "生产沙子。")
    this.loggingMachine = new Unit(this.game, "loggingMachine", "伐木机",
      "生产木材。")
    this.mine = new Unit(this.game, "mine", "矿井",
      "生产水晶。")
    this.honeyMaker = new Unit(this.game, "honeyMaker", "蜂蜜机",
      "自动制作蜂蜜。只有蜜蜂知道它的工作原理。")
    this.iceCompacter = new Unit(this.game, "iceC", "压冰机",
      "压冰机是将冰块压成水晶的机器。")
    this.iceCollector = new Unit(this.game, "iceK", "水箱",
      "一个水箱。")
    this.burningGlass = new Unit(this.game, "burningGlass", "炽热镜头",
      "聚集太阳光线的大凸透镜。这台机器能比其他任何东西更快地融化冰块。")

    this.listMachinery = new Array<Unit>()

    this.listMachinery.push(this.composterStation)
    this.listMachinery.push(this.refineryStation)
    this.listMachinery.push(this.laserStation)
    this.listMachinery.push(this.hydroFarm)
    this.listMachinery.push(this.plantingMachine)
    this.listMachinery.push(this.sandDigger)
    this.listMachinery.push(this.loggingMachine)
    this.listMachinery.push(this.mine)
    this.listMachinery.push(this.honeyMaker)
    this.listMachinery.push(this.iceCompacter)
    this.listMachinery.push(this.iceCollector)
    this.listMachinery.push(this.burningGlass)

    this.game.lists.push(new TypeList("机器", this.listMachinery))
  }

  public initStuff() {

    //    Composter
    // this.composterStation.types = [Type.Machinery]
    this.composterStation.actions.push(new BuyAction(this.game,
      this.composterStation,
      [
        new Cost(this.game.baseWorld.wood, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.fungus, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.soil.addProductor(new Production(this.composterStation, this.machineryProd))
    this.game.baseWorld.wood.addProductor(new Production(this.composterStation, this.machineryCost))

    //    Refinery
    // this.refineryStation.types = [Type.Machinery]
    this.refineryStation.actions.push(new BuyAction(this.game,
      this.refineryStation,
      [
        new Cost(this.game.baseWorld.soil, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.wood, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.fungus, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.sand.addProductor(new Production(this.refineryStation, this.machineryProd))
    this.game.baseWorld.soil.addProductor(new Production(this.refineryStation, this.machineryCost))


    //    Laser
    // this.laserStation.types = [Type.Machinery]
    this.laserStation.actions.push(new BuyAction(this.game,
      this.laserStation,
      [
        new Cost(this.game.baseWorld.sand, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.soil, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.wood, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.crystal.addProductor(new Production(this.laserStation, this.machineryProd))
    this.game.baseWorld.sand.addProductor(new Production(this.laserStation, this.machineryCost))


    //    Hydroponic Farm
    // this.hydroFarm.types = [Type.Machinery]
    this.hydroFarm.actions.push(new BuyAction(this.game,
      this.hydroFarm,
      [
        new Cost(this.game.baseWorld.crystal, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.sand, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.soil, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.fungus.addProductor(new Production(this.hydroFarm, this.machineryProd))
    this.game.baseWorld.crystal.addProductor(new Production(this.hydroFarm, this.machineryCost))

    //    Planting Machine
    // this.plantingMachine.types = [Type.Machinery]
    this.plantingMachine.actions.push(new BuyAction(this.game,
      this.plantingMachine,
      [
        new Cost(this.game.baseWorld.fungus, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.sand, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.wood.addProductor(new Production(this.plantingMachine, this.machineryProd))
    this.game.baseWorld.fungus.addProductor(new Production(this.plantingMachine, this.machineryCost))


    //    Not always avaiable
    const machineryProd2 = this.machineryProd.div(2)

    //    Sand digger
    this.sandDigger.avabileBaseWorld = false
    // this.sandDigger.types = [Type.Machinery]
    this.sandDigger.actions.push(new BuyAction(this.game,
      this.sandDigger,
      [
        new Cost(this.game.baseWorld.wood, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.sand.addProductor(new Production(this.sandDigger, machineryProd2))

    //    Wood
    this.loggingMachine.avabileBaseWorld = false
    // this.loggingMachine.types = [Type.Machinery]
    this.loggingMachine.actions.push(new BuyAction(this.game,
      this.loggingMachine,
      [
        new Cost(this.game.baseWorld.wood, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.wood.addProductor(new Production(this.loggingMachine, machineryProd2))

    //    Mine
    this.mine.avabileBaseWorld = false
    // this.mine.types = [Type.Machinery]
    this.mine.actions.push(new BuyAction(this.game,
      this.mine,
      [
        new Cost(this.game.baseWorld.wood, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.soil, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.crystal.addProductor(new Production(this.mine, machineryProd2))

    //    Honey
    this.honeyMaker.avabileBaseWorld = false
    // this.honeyMaker.types = [Type.Machinery]
    this.honeyMaker.actions.push(new BuyAction(this.game,
      this.honeyMaker,
      [
        new Cost(this.game.baseWorld.nectar, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.honey, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.honey.addProductor(new Production(this.honeyMaker, this.machineryProd))
    this.game.baseWorld.nectar.addProductor(new Production(this.honeyMaker, this.machineryCost))

    //    Ice Compacter
    this.iceCompacter.avabileBaseWorld = false
    // this.iceCompacter.types = [Type.Machinery]
    this.iceCompacter.actions.push(new BuyAction(this.game,
      this.iceCompacter,
      [
        new Cost(this.game.baseWorld.crystal, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.wood, this.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.soil, this.price3, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.crystal.addProductor(new Production(this.iceCompacter, this.machineryProd))
    this.game.baseWorld.ice.addProductor(new Production(this.iceCompacter, this.machineryCost))

    //    Ice Collector
    this.iceCollector.avabileBaseWorld = false
    // this.iceCollector.types = [Type.Machinery]
    this.iceCollector.actions.push(new BuyAction(this.game,
      this.iceCollector,
      [
        new Cost(this.game.baseWorld.wood, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.soil, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.crystal.addProductor(new Production(this.iceCollector, machineryProd2))

    //    Ice Burning Glass
    this.burningGlass.avabileBaseWorld = false
    // this.burningGlass.types = [Type.Machinery]
    this.burningGlass.actions.push(new BuyAction(this.game,
      this.burningGlass,
      [
        new Cost(this.game.baseWorld.crystal, this.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.wood, this.price2, this.game.buyExp)
      ]
    ))
    this.game.baseWorld.ice.addProductor(new Production(this.burningGlass, machineryProd2.times(-10)))
  }

  public addWorld() {
    World.worldPrefix.push(
      new World(this.game, "机械化", "",
        [], [], [], [], [],
        [
          [this.composterStation, Decimal(0.2)],
          [this.refineryStation, Decimal(0.2)],
          [this.laserStation, Decimal(0.2)],
          [this.hydroFarm, Decimal(0.2)],
          [this.plantingMachine, Decimal(0.2)]
        ],
        Decimal(1)
      ))

    World.worldSuffix.push(
      new World(this.game, "机器", "",
        [], [], [], [], [],
        [
          [this.composterStation, Decimal(0.2)],
          [this.refineryStation, Decimal(0.2)],
          [this.laserStation, Decimal(0.2)],
          [this.hydroFarm, Decimal(0.2)],
          [this.plantingMachine, Decimal(0.2)]
        ],
        Decimal(1)
      ))
  }
}

