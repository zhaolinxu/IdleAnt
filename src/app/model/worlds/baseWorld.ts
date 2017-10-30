import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class BaseWorld implements WorldInterface {

  //    Materials
  food: Unit
  crystal: Unit
  soil: Unit
  science: Unit
  fungus: Unit
  wood: Unit
  sand: Unit
  nectar: Unit
  honey: Unit
  ice: Unit
  listMaterial = Array<Unit>()

  //  Hunting
  hunter: Unit
  advancedHunter: Unit

  //    Tier 1
  geologist: Unit
  carpenter: Unit
  farmer: Unit
  lumberjack: Unit
  level1 = Array<Unit>()

  //    Tier 2
  composterAnt: Unit
  refineryAnt: Unit
  laserAnt: Unit
  hydroAnt: Unit
  planterAnt: Unit
  level2 = Array<Unit>()

  jobMaterial: Unit[][]

  listJobs = Array<Unit>()

  baseFood = Decimal(800)
  price2 = Decimal(100)

  //  Prices
  specialProduction = Decimal(100)
  specialCost = Decimal(-40)
  specialFood = Decimal(1E7)
  specialRes2 = Decimal(1E4)

  prestigeFood = Decimal(1E10)
  prestigeOther1 = Decimal(1E6)
  prestigeOther2 = Decimal(1E5)
  prestigeUnit = Decimal(200)

  //    Generators
  littleAnt: Unit
  queenAnt: Unit
  nestAnt: Unit
  list = Array<Unit>()

  constructor(public game: GameModel) { }

  declareStuff() {
    this.declareMaterials()
    this.declareGenerators()
    this.declareJobs()

    this.game.lists.push(new TypeList("材料", this.listMaterial))
    this.game.lists.push(new TypeList("工作", this.level1))
    this.game.lists.push(new TypeList("高级工作", this.level2))
    this.game.lists.push(new TypeList("蚂蚁", this.list))
  }

  initStuff() {
    this.initGenerators()
    this.initJobs()
  }

  declareMaterials() {
    this.food = new Unit(this.game, "food", "食物", "食物是用来生产几乎所有的单位。")
    this.food.unlocked = true
    this.listMaterial.push(this.food)

    this.crystal = new Unit(this.game, "cri", "水晶", "水晶用来生产科学。")
    this.listMaterial.push(this.crystal)

    this.soil = new Unit(this.game, "soil", "土壤", "土壤用来做巢。")
    this.listMaterial.push(this.soil)

    this.science = new Unit(this.game, "sci", "科学", "科学是用来改善和解锁的东西。")
    this.listMaterial.push(this.science)

    this.fungus = new Unit(this.game, "fun", "真菌", "真菌是食物的来源。")
    this.listMaterial.push(this.fungus)

    this.wood = new Unit(this.game, "wood", "木头", "木材用来制作更好的巢和机械。")
    this.listMaterial.push(this.wood)

    this.sand = new Unit(this.game, "sand", "沙子", "沙子可以用来制造水晶。")
    this.listMaterial.push(this.sand)

    this.nectar = new Unit(this.game, "nectar", "花蜜", "花蜜用于制作蜂蜜。")
    this.listMaterial.push(this.nectar)

    this.honey = new Unit(this.game, "honey", "蜂蜜", "蜂蜜是蜜蜂的主要来源。")
    this.listMaterial.push(this.honey)

    this.ice = new Unit(this.game, "ice", "Ice",
      "Ice")
    this.listMaterial.push(this.ice)

    //    Fungus
    this.fungus.actions.push(new UpSpecial(this.game, this.fungus))

  }
  declareGenerators() {
    this.littleAnt = new Unit(this.game, "G1", "蚂蚁",
      "蚂蚁是最低级的工人。 他们不断收集食物。")
    this.queenAnt = new Unit(this.game, "G2", "蚁后",
      "蚁后生产蚂蚁。")
    this.nestAnt = new Unit(this.game, "G3", "蚁巢",
      "蚁巢生产蚁后。")
  }
  declareJobs() {
    this.geologist = new Unit(this.game, "geo", "地质学家", "地质学家生产水晶。")
    // this.geologist.types = [Type.Ant, Type.Mining]
    this.listJobs.push(this.geologist)

    this.carpenter = new Unit(this.game, "car", "木匠", "木匠产生土壤。")
    // this.carpenter.types = [Type.Ant, Type.SoilG]
    this.listJobs.push(this.carpenter)

    this.farmer = new Unit(this.game, "far", "农民", "农民生产真菌。")
    // this.farmer.types = [Type.Ant, Type.Farmer]
    this.listJobs.push(this.farmer)

    this.lumberjack = new Unit(this.game, "lum", "伐木工", "伐木工人生产木材。")
    // this.lumberjack.types = [Type.Ant, Type.WoodG]
    this.listJobs.push(this.lumberjack)


    this.composterAnt = new Unit(this.game, "com", "堆肥蚂蚁",
      "将木材变成土壤。")
    this.refineryAnt = new Unit(this.game, "ref", "精炼蚂蚁",
      "将土壤变成沙子。")
    this.laserAnt = new Unit(this.game, "las", "激光蚂蚁",
      "将沙子变成水晶。")
    this.hydroAnt = new Unit(this.game, "hydroFarmer", "水培蚂蚁",
      "将水晶变成真菌。")
    this.planterAnt = new Unit(this.game, "planterAnt", "播种机蚂蚁",
      "将真菌变成木头。")


    this.hunter = new Unit(this.game, "hunter", "猎人",
      "猎人生产食物。")
    this.advancedHunter = new Unit(this.game, "advhunter", "高级猎人",
      "高级猎人生产更多食物。")

    this.level1 = [this.geologist, this.farmer, this.carpenter, this.lumberjack, this.hunter, this.advancedHunter]

  }
  initGenerators() {
    this.list.push(this.littleAnt, this.queenAnt, this.nestAnt)
    // this.list.forEach(ant => ant.types = [Type.Ant, Type.Generator])

    this.littleAnt.unlocked = true

    this.littleAnt.actions.push(new BuyAndUnlockAction(this.game,
      this.littleAnt,
      [new Cost(this.food, Decimal(15), Decimal(this.game.buyExp))],
      [this.queenAnt]
    ))

    this.queenAnt.actions.push(new BuyAndUnlockAction(this.game,
      this.queenAnt,
      [
        new Cost(this.food, Decimal(8E2), Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(20), Decimal(this.game.buyExpUnit))
      ],
      [this.nestAnt, this.geologist]
    ))

    this.nestAnt.actions.push(new BuyAction(this.game,
      this.nestAnt,
      [
        new Cost(this.food, this.prestigeFood, Decimal(this.game.buyExp)),
        new Cost(this.soil, this.prestigeOther1, Decimal(this.game.buyExp)),
        new Cost(this.wood, this.prestigeOther2, Decimal(this.game.buyExp)),
        new Cost(this.queenAnt, this.prestigeUnit, Decimal(this.game.buyExpUnit))
      ],
    ))

    for (let i = 0; i < this.list.length - 1; i++)
      this.list[i].addProductor(new Production(this.list[i + 1]))

    for (let i = 0; i < this.list.length; i++) {
      this.list[i].actions.push(new UpAction(this.game, this.list[i],
        [new Cost(this.science, Decimal(Decimal(100).times(Decimal.pow(10, Decimal(i)))), this.game.upgradeScienceExp)]))
      this.list[i].actions.push(new UpHire(this.game, this.list[i],
        [new Cost(this.science, Decimal(Decimal(100).times(Decimal.pow(10, Decimal(i)))), this.game.upgradeScienceHireExp)]))
    }

    this.list = this.list.reverse()
  }
  initJobs() {
    //    Prices && Production
    this.food.addProductor(new Production(this.littleAnt, Decimal(1)))
    this.food.addProductor(new Production(this.fungus, Decimal(2)))
    this.fungus.addProductor(new Production(this.farmer))
    this.soil.addProductor(new Production(this.farmer, Decimal(-1)))
    this.crystal.addProductor(new Production(this.geologist, Decimal(0.2)))
    this.soil.addProductor(new Production(this.carpenter))
    this.wood.addProductor(new Production(this.lumberjack))

    this.food.addProductor(new Production(this.hunter, Decimal(50)))
    this.wood.addProductor(new Production(this.hunter, Decimal(-2)))

    this.food.addProductor(new Production(this.advancedHunter, Decimal(250)))
    this.wood.addProductor(new Production(this.advancedHunter, Decimal(-10)))
    this.crystal.addProductor(new Production(this.advancedHunter, Decimal(-5)))

    //    Geologist
    this.geologist.actions.push(new BuyAndUnlockAction(this.game,
      this.geologist,
      [
        new Cost(this.food, this.baseFood, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ],
      [this.crystal, this.game.science.student]
    ))

    //    Carpenter
    this.carpenter.actions.push(new BuyAndUnlockAction(this.game,
      this.carpenter,
      [
        new Cost(this.food, this.baseFood, Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
      ],
      [this.science]
    ))

    //    Lumberjack
    this.lumberjack.actions.push(new BuyAndUnlockAction(this.game,
      this.lumberjack,
      [
        new Cost(this.food, this.baseFood, Decimal(this.game.buyExp)),
        new Cost(this.soil, this.price2, Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
      ],
      [this.wood]
    ))

    //    Farmer
    this.farmer.actions.push(new BuyAndUnlockAction(this.game,
      this.farmer,
      [
        new Cost(this.food, this.baseFood, Decimal(this.game.buyExp)),
        new Cost(this.soil, this.price2, Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
      ],
      [this.fungus]
    ))

    //    Hunter
    this.hunter.actions.push(new BuyAction(this.game,
      this.hunter,
      [
        new Cost(this.food, this.baseFood.div(1.5), Decimal(this.game.buyExp)),
        new Cost(this.wood, this.price2.div(1.5), Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
      ]
    ))

    //    Hunter 2
    this.advancedHunter.actions.push(new BuyAction(this.game,
      this.advancedHunter,
      [
        new Cost(this.food, this.baseFood, Decimal(this.game.buyExp)),
        new Cost(this.wood, this.price2, Decimal(this.game.buyExp)),
        new Cost(this.crystal, this.price2.div(1.5), Decimal(this.game.buyExp)),
        new Cost(this.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit)),
      ]
    ))

    this.level1.forEach(l => {
      l.actions.push(new UpAction(this.game, l,
        [new Cost(this.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
      l.actions.push(new UpHire(this.game, l,
        [new Cost(this.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]))
    })


    //
    //    Special
    //

    //  Composter
    // this.composterAnt.types = [Type.Ant]
    this.level2.push(this.composterAnt)
    this.composterAnt.actions.push(new BuyAction(this.game,
      this.composterAnt,
      [
        new Cost(this.food, this.specialFood, this.game.buyExp),
        new Cost(this.wood, this.specialRes2, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.soil.addProductor(new Production(this.composterAnt, this.specialProduction))
    this.wood.addProductor(new Production(this.composterAnt, this.specialCost))

    //  Refinery
    // this.refineryAnt.types = [Type.Ant]
    this.level2.push(this.refineryAnt)
    this.refineryAnt.actions.push(new BuyAction(this.game,
      this.refineryAnt,
      [
        new Cost(this.food, this.specialFood, this.game.buyExp),
        new Cost(this.soil, this.specialRes2, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.sand.addProductor(new Production(this.refineryAnt, this.specialProduction))
    this.soil.addProductor(new Production(this.refineryAnt, this.specialCost))

    //  Laser
    //   this.laserAnt.types = [Type.Ant]
    this.level2.push(this.laserAnt)
    this.laserAnt.actions.push(new BuyAction(this.game,
      this.laserAnt,
      [
        new Cost(this.food, this.specialFood, this.game.buyExp),
        new Cost(this.sand, this.specialRes2, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.crystal.addProductor(new Production(this.laserAnt, this.specialProduction))
    this.sand.addProductor(new Production(this.laserAnt, this.specialCost))

    //  Hydro
    //  this.hydroAnt.types = [Type.Ant]
    this.level2.push(this.hydroAnt)
    this.hydroAnt.actions.push(new BuyAction(this.game,
      this.hydroAnt,
      [
        new Cost(this.food, this.specialFood, this.game.buyExp),
        new Cost(this.crystal, this.specialRes2, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.fungus.addProductor(new Production(this.hydroAnt, this.specialProduction))
    this.crystal.addProductor(new Production(this.hydroAnt, this.specialCost))

    //  Planter
    //    this.planterAnt.types = [Type.Ant]
    this.level2.push(this.planterAnt)
    this.planterAnt.actions.push(new BuyAction(this.game,
      this.planterAnt,
      [
        new Cost(this.food, this.specialFood, this.game.buyExp),
        new Cost(this.fungus, this.specialRes2, this.game.buyExp),
        new Cost(this.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.wood.addProductor(new Production(this.planterAnt, this.specialProduction))
    this.fungus.addProductor(new Production(this.planterAnt, this.specialCost))

    this.level2.forEach(l => {
      l.actions.push(new UpAction(this.game, l,
        [new Cost(this.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
      l.actions.push(new UpHire(this.game, l,
        [new Cost(this.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]))
    })
  }
  addWorld() {

    World.worldTypes.push(
      new World(this.game, "Park", "",
        [],
        [],
        []
      ),
      new World(this.game, "Mine", "一个矿井",
        [this.game.machines.mine, this.game.engineers.mineEnginer],
        [
          [this.game.baseWorld.crystal, Decimal(1.2)],
          [this.game.baseWorld.wood, Decimal(0.8)],
          [this.game.baseWorld.fungus, Decimal(0.8)]
        ],
        []
      )
    )

    World.worldPrefix.push(
      new World(this.game, "", "", [], [], []),
      new World(this.game, "炎热", "",
        [],
        [[this.game.baseWorld.food, Decimal(2)]],
        [], [], [], [],
        Decimal(2)
      ),
      new World(this.game, "干旱", "",
        [],
        [[this.game.baseWorld.fungus, Decimal(0.5)]],
        [], [], [], [],
        Decimal(3)
      ),
      new World(this.game, "树木繁茂", "",
        [this.game.engineers.woodEnginer, this.game.machines.loggingMachine],
        [[this.game.baseWorld.wood, Decimal(2)]],
        [], [], [], [],
        Decimal(1.5)
      ),
      new World(this.game, "结晶", "",
        [this.game.machines.mine, this.game.engineers.mineEnginer],
        [
          [this.game.baseWorld.crystal, Decimal(1.5)],
          [this.game.baseWorld.food, Decimal(0.4)],
          [this.game.baseWorld.fungus, Decimal(0.4)]
        ],
        []
      ),
      new World(this.game, "垂死的", "",
        [],
        [
          [this.food, Decimal(0.5)],
          [this.fungus, Decimal(0.5)],
          [this.wood, Decimal(0.5)],
          [this.honey, Decimal(0.5)],
          [this.nectar, Decimal(0.5)]
        ],
        [], [], [], [],
        Decimal(4.5)
      ),
      new World(this.game, "多雨的", "",
        [],
        [
          [this.wood, Decimal(1.5)],
          [this.fungus, Decimal(1.5)]
        ], [], [], [], [],
        Decimal(1.5)
      ),
      new World(this.game, "有雾", "",
        [],
        [
          [this.wood, Decimal(0.7)],
          [this.fungus, Decimal(0.7)]
        ], [], [], [], [],
        Decimal(3)
      ),
      new World(this.game, "技术", "",
        [],
        [
          [this.science, Decimal(1.5)]
        ], [], [], [], [],
        Decimal(1.5)
      ),
      new World(this.game, "饥饿", "",
        [],
        [
          [this.food, Decimal(0.3)]
        ], [], [], [], [],
        Decimal(3.5)
      ),
    )

    World.worldSuffix.push(

      new World(this.game, "", "", [], [], []),
      new World(this.game, "的真菌", "",
        [],
        [[this.game.baseWorld.fungus, Decimal(2)]],
        [new Cost(this.game.baseWorld.fungus, Decimal(1E7))],
        [], [], [],
        Decimal(3.5)
      ),

      new World(this.game, "的蚂蚁", "",
        [], [], [],
        [[this.littleAnt, Decimal(2)]],
        [], [],
        Decimal(2)
      ),
      new World(this.game, "的科学家", "",
        [], [], [],
        [[this.game.science.scientist, Decimal(2)]],
        [], [],
        Decimal(2)
      ),
      new World(this.game, "的农民", "",
        [], [], [],
        [[this.farmer, Decimal(2)]],
        [], [],
        Decimal(2)
      ),
      new World(this.game, "的水晶", "",
        [this.game.machines.mine, this.game.engineers.mineEnginer],
        [[this.crystal, Decimal(2)]],
        [], [], [], [],
        Decimal(2)
      ),

    )

  }
}
