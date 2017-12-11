import { TogableProduction } from '../units/togableProductions';
import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';
import { Engineers } from './engineer';

export class Bee implements WorldInterface {

  foragingBee: Unit
  workerBee: Unit
  queenBee: Unit
  hiveBee: Unit
  beeResearch: Research
  universityBee: Unit

  bear: Unit
  panda: Unit
  bearCrystalProduction: Production
  bearSoilProduction: Production
  bearRes: Research
  padaRes: Research
  bear2Res: Research
  bear3Res: Research

  scientistBee: Unit
  foodBee: Unit
  advancedBee: Research
  universityResBee: Research
  universityResBee2: Research

  engineersProd: Production

  listBee = new Array<Unit>()

  constructor(public game: GameModel) { }

  declareStuff() {

    this.foragingBee = new Unit(this.game, "forBee", "觅食蜜蜂",
      "觅食蜜蜂产出花蜜。")
    this.queenBee = new Unit(this.game, "qBee", "蜂后",
      "产生觅食蜜蜂。")
    this.hiveBee = new Unit(this.game, "hBee", "蜂巢",
      "蜂巢产生皇后，并指示觅食的蜜蜂成为工人。")
    this.workerBee = new Unit(this.game, "worBee", "工蜂",
      "工蜜蜂将花蜜转成蜂蜜。")
    this.scientistBee = new Unit(this.game, "scBee", "科学家蜜蜂",
      "科学家蜜蜂研究蜂蜜属性。")
    this.foodBee = new Unit(this.game, "foodBee", "食品蜜蜂",
      "将蜂蜜转化为食物。")
    this.universityBee = new Unit(this.game, "universityBee", "蜜蜂大学",
      "指导新的科学家蜜蜂。")
    this.bear = new Unit(this.game, "bear", "熊",
      "熊为了蜂蜜可以做任何事情。")
    this.panda = new Unit(this.game, "panda", "熊猫",
      "熊猫是伟大的科学家。")

    this.listBee.push(this.hiveBee)
    this.listBee.push(this.queenBee)
    this.listBee.push(this.foragingBee)
    this.listBee.push(this.workerBee)
    this.listBee.push(this.universityBee)
    this.listBee.push(this.scientistBee)
    this.listBee.push(this.foodBee)
    this.listBee.push(this.bear)
    this.listBee.push(this.panda)

    this.game.lists.push(new TypeList("蜜蜂", this.listBee))

    this.engineersProd = new Production(this.universityBee, new Decimal(0.1), false)

    this.bearCrystalProduction = new Production(this.bear, this.game.machines.machineryProd.times(30), false)
    this.bearSoilProduction = new Production(this.bear, this.game.machines.machineryProd.times(40), false)
  }

  initStuff() {
    const beeTeamUp = this.game.upgradeScienceExp.times(0.8)
    const beeHireUp = this.game.upgradeScienceHireExp.times(0.8)

    //    Foragging
    // this.foragingBee.types = [Type.Bee]
    this.foragingBee.actions.push(new BuyAction(this.game,
      this.foragingBee,
      [new Cost(this.game.baseWorld.food, new Decimal(100), this.game.buyExp)]
    ))
    this.game.baseWorld.nectar.addProductor(new Production(this.foragingBee))
    this.foragingBee.actions.push(new UpAction(this.game,

      this.foragingBee, [new Cost(this.game.baseWorld.science, this.game.scienceCost1, beeTeamUp)]))
    this.foragingBee.actions.push(new UpHire(this.game,
      this.foragingBee, [new Cost(this.game.baseWorld.science, this.game.scienceCost1, beeHireUp)]))

    // this.queenBee.types = [Type.Bee]
    // this.hiveBee.types = [Type.Bee]

    //    Worker
    // this.workerBee.types = [Type.Bee]
    this.workerBee.actions.push(new BuyAndUnlockAction(this.game,
      this.workerBee,
      [
        new Cost(this.game.baseWorld.nectar, new Decimal(100), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(1000), this.game.buyExp),
        new Cost(this.foragingBee, new Decimal(1), this.game.buyExpUnit)
      ], [this.queenBee]
    ))
    this.game.baseWorld.nectar.addProductor(new Production(this.workerBee, new Decimal(-2)))
    this.game.baseWorld.honey.addProductor(new Production(this.workerBee, new Decimal(1.5)))

    this.workerBee.actions.push(new UpAction(this.game,
      this.workerBee, [new Cost(this.game.baseWorld.science, this.game.scienceCost2, beeTeamUp)]))

    this.workerBee.actions.push(new UpHire(this.game,
      this.workerBee, [new Cost(this.game.baseWorld.science, this.game.scienceCost2, beeHireUp)]))

    //  Queen
    this.queenBee.actions.push(new BuyAndUnlockAction(this.game,
      this.queenBee,
      [
        new Cost(this.foragingBee, new Decimal(50), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.honey, new Decimal(1E3), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(1E6), this.game.buyExp),
      ], [this.hiveBee]
    ))
    this.foragingBee.addProductor(new Production(this.queenBee))

    //  Hive
    this.hiveBee.actions.push(new BuyAction(this.game,
      this.hiveBee,
      [
        new Cost(this.queenBee, new Decimal(100), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.honey, this.game.baseWorld.prestigeOther1.times(1.5),
          this.game.buyExp.times(1.1)),
        new Cost(this.game.baseWorld.food, this.game.baseWorld.prestigeFood.times(0.8), this.game.buyExp),
      ]
    ))
    this.queenBee.addProductor(new Production(this.hiveBee))
    this.foragingBee.addProductor(new Production(this.hiveBee, new Decimal(-5)))
    this.workerBee.addProductor(new Production(this.hiveBee, new Decimal(5)))

    this.queenBee.actions.push(new UpAction(this.game, this.queenBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, beeTeamUp)]))
    this.queenBee.actions.push(new UpHire(this.game, this.queenBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, new Decimal(10))]))

    this.hiveBee.actions.push(new UpAction(this.game, this.hiveBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, beeTeamUp)]))
    this.hiveBee.actions.push(new UpHire(this.game, this.hiveBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, beeHireUp)]))

    //    Scientist
    // this.scientistBee.types = [Type.Bee]
    this.scientistBee.actions.push(new BuyAction(this.game,
      this.scientistBee,
      [
        new Cost(this.foragingBee, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.honey, new Decimal(6E3), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, new Decimal(4E3), this.game.buyExp),
      ]
    ))
    this.game.baseWorld.science.addProductor(new Production(this.scientistBee, new Decimal(15)))
    this.game.baseWorld.honey.addProductor(new Production(this.scientistBee, new Decimal(-2)))
    this.game.baseWorld.crystal.addProductor(new Production(this.scientistBee, new Decimal(-1)))

    this.scientistBee.actions.push(new UpAction(this.game, this.scientistBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, beeTeamUp)]))
    this.scientistBee.actions.push(new UpHire(this.game, this.scientistBee,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, beeHireUp)]))

    //    Food
    // this.foodBee.types = [Type.Bee]
    this.foodBee.actions.push(new BuyAction(this.game,
      this.foodBee,
      [
        new Cost(this.foragingBee, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.honey, new Decimal(1E3), this.game.buyExp)
      ]
    ))
    this.game.baseWorld.food.addProductor(new Production(this.foodBee, new Decimal(15)))
    this.game.baseWorld.honey.addProductor(new Production(this.foodBee, new Decimal(-5)))
    this.foodBee.actions.push(new UpAction(this.game, this.foodBee,
      [new Cost(this.game.baseWorld.science, new Decimal(1E3), new Decimal(10))]))
    this.foodBee.actions.push(new UpHire(this.game, this.foodBee,
      [new Cost(this.game.baseWorld.science, new Decimal(1E3), new Decimal(10))]))

    //    University
    this.universityBee.actions.push(new BuyAction(this.game,
      this.universityBee,
      [
        new Cost(this.foragingBee, new Decimal(1E3), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.wood, this.game.machines.price1, this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.game.machines.price2, this.game.buyExp),
        new Cost(this.game.baseWorld.honey, this.game.machines.price2, this.game.buyExp)
      ]
    ))

    this.game.baseWorld.science.addProductor(new Production(this.universityBee, new Decimal(600)))
    this.scientistBee.addProductor(new Production(this.universityBee, new Decimal(0.01)))

    this.game.engineers.beeEnginer.addProductor(this.engineersProd)

    this.universityBee.togableProductions = [new TogableProduction("产生蜜蜂工程师", [this.engineersProd])]

    //  Bear
    this.bear.actions.push(new BuyAction(this.game,
      this.bear,
      [
        new Cost(this.game.baseWorld.food, this.game.machines.price1.times(50000), this.game.buyExp),
        new Cost(this.game.baseWorld.honey, this.game.machines.price1.times(5), this.game.buyExp)
      ]
    ))
    this.bear.actions.push(new UpAction(this.game, this.bear,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.bear.actions.push(new UpHire(this.game, this.bear,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.honey.addProductor(new Production(this.bear, this.game.machines.machineryCost))
    this.game.baseWorld.wood.addProductor(new Production(this.bear, this.game.machines.machineryProd.times(50)))
    this.game.baseWorld.soil.addProductor(this.bearSoilProduction)
    this.game.baseWorld.crystal.addProductor(this.bearCrystalProduction)

    //  Panda
    this.panda.actions.push(new BuyAction(this.game,
      this.panda,
      [
        new Cost(this.game.baseWorld.food, this.game.machines.price1.times(50000), this.game.buyExp),
        new Cost(this.game.baseWorld.honey, this.game.machines.price1.times(5), this.game.buyExp)
      ]
    ))
    this.panda.actions.push(new UpAction(this.game, this.panda,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3.div(5), this.game.upgradeScienceExp)]))
    this.panda.actions.push(new UpHire(this.game, this.panda,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3.div(5), this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.honey.addProductor(new Production(this.panda, this.game.machines.machineryCost))
    this.game.baseWorld.science.addProductor(new Production(this.panda, this.game.machines.machineryProd.times(50)))

    //  Bears crystall
    this.bear3Res = new Research(
      "bg3Res",
      "采矿熊", "熊也产生水晶。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E8))],
      [this.bearCrystalProduction],
      this.game
    )

    //  Bears soil
    this.bear2Res = new Research(
      "bg2Res",
      "木匠熊", "熊也会产生土壤。",
      [new Cost(this.game.baseWorld.science, new Decimal(5E6))],
      [this.bearSoilProduction, this.bear3Res],
      this.game
    )

    //  Bears
    this.bearRes = new Research(
      "bgRes",
      "熊", "熊喜欢蜂蜜。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E5))],
      [this.bear, this.panda, this.bear2Res],
      this.game
    )

    //  Dep of bee
    this.universityResBee2 = new Research(
      "uniResBee2",
      "蜜蜂工程系", "蜜蜂大学还产生蜜蜂工程师。",
      [new Cost(this.game.baseWorld.science, new Decimal(7E7))],
      [this.engineersProd],
      this.game
    )

    //  Research
    this.universityResBee = new Research(
      "universityResBee",
      "蜜蜂大学", "获得一所蜜蜂大学。",
      [new Cost(this.game.baseWorld.science, new Decimal(6E6))],
      [this.universityBee, this.universityResBee2],
      this.game
    )

    //  Research
    this.advancedBee = new Research(
      "advBee",
      "高级蜜蜂", "蜜蜂更多的工作种类。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E3))],
      [this.scientistBee, this.foodBee, this.universityResBee, this.bearRes],
      this.game
    )

    //    Bee
    this.beeResearch = new Research(
      "beeRes",
      "蜜蜂", "解锁蜜蜂 !",
      [new Cost(this.game.baseWorld.science, new Decimal(0))],
      [this.game.baseWorld.nectar, this.foragingBee, this.workerBee, this.game.baseWorld.honey, this.advancedBee],
      this.game
    )
    this.beeResearch.avabileBaseWorld = false
  }

  addWorld() {

    World.worldPrefix.push(
      new World(this.game, "蜜蜂的", "",
        [this.game.machines.honeyMaker, this.game.engineers.beeEnginer],
        [],
        [
          new Cost(this.hiveBee, new Decimal(20)),
          new Cost(this.game.baseWorld.honey, this.game.baseWorld.prestigeFood)
        ],
        [],
        [],
        [[this.beeResearch, new Decimal(0)]],
        new Decimal(3)
      )
    )

    World.worldSuffix.push(
      new World(this.game, "蜜蜂", "",
        [this.game.machines.honeyMaker, this.game.engineers.beeEnginer],
        [],
        [
          new Cost(this.hiveBee, new Decimal(25)),
          new Cost(this.game.baseWorld.honey, this.game.baseWorld.prestigeFood)
        ],
        [[this.foragingBee, new Decimal(2)]],
        [],
        [[this.beeResearch, new Decimal(0)]],
        new Decimal(3)
      ),
      new World(this.game, "熊", "",
        [this.game.machines.honeyMaker, this.game.engineers.beeEnginer],
        [],
        [
          new Cost(this.bear, new Decimal(250)),
          new Cost(this.game.baseWorld.honey, this.game.baseWorld.prestigeFood)
        ],
        [
          [this.bear, new Decimal(3)],
          [this.panda, new Decimal(3)]
        ],
        [],
        [[this.beeResearch, new Decimal(0)]],
        new Decimal(3)
      )
    )
  }
}
