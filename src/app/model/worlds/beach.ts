import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Beach implements WorldInterface {

  crab: Unit
  crabQueen: Unit
  crabNest: Unit

  crabFarmer: Unit
  crabScientist: Unit

  shrimp: Unit
  lobster: Unit

  seaRes: Research
  crabJobRes: Research
  shrimpRes: Research
  lobsterRes: Research

  constructor(public game: GameModel) { }

  declareStuff() {
    const beachList = new Array<Unit>()
    this.crab = new Unit(this.game, "crab", "螃蟹", "螃蟹生产沙子。")
    this.crabFarmer = new Unit(this.game, "crabF", "农民蟹", "农民螃蟹产生真菌。")
    this.crabQueen = new Unit(this.game, "CrabQ", "皇后蟹", "皇后蟹生产螃蟹。")
    this.crabNest = new Unit(this.game, "CrabN", "螃蟹巢", "螃蟹巢产量皇后蟹。")
    this.shrimp = new Unit(this.game, "shrimp", "虾",
      "虾生产砂和水晶。")
    this.lobster = new Unit(this.game, "lobster", "龙虾",
      "龙虾生产沙子，以水晶为食。")
    this.crabScientist = new Unit(this.game, "crabScientist", "科学家蟹",
      "科学家蟹将从沙子里面获得科学。")

    beachList.push(this.crabNest)
    beachList.push(this.crabQueen)
    beachList.push(this.crab)
    beachList.push(this.crabFarmer)
    beachList.push(this.crabScientist)
    beachList.push(this.shrimp)
    beachList.push(this.lobster)

    //    lobster
    this.lobsterRes = new Research(
      "lobsterRes",
      "龙虾", "解锁龙虾。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E5))],
      [this.lobster],
      this.game
    )

    //    shrimp
    this.shrimpRes = new Research(
      "shrimpRes",
      "虾", "解锁虾。",
      [new Cost(this.game.baseWorld.science, new Decimal(2E3))],
      [this.shrimp],
      this.game
    )

    //    Crab Jobs
    this.crabJobRes = new Research(
      "crabJobRes",
      "螃蟹作业", "为您的螃蟹解锁更多的工作。",
      [new Cost(this.game.baseWorld.science, new Decimal(1.5E3))],
      [this.crabFarmer, this.crabScientist],
      this.game
    )

    //    Research
    this.seaRes = new Research(
      "seaRes",
      "海上助手", "解锁海上助手。",
      [new Cost(this.game.baseWorld.science, new Decimal(30))],
      [this.crab, this.crabQueen, this.crabJobRes, this.shrimpRes, this.lobsterRes],
      this.game
    )
    this.seaRes.avabileBaseWorld = false
    this.game.lists.push(new TypeList("海滩", beachList))

  }
  initStuff() {
    //    Crab
    this.crab.actions.push(new BuyAction(this.game,
      this.crab,
      [new Cost(this.game.baseWorld.food, new Decimal(1E3), this.game.buyExp)]
    ))
    this.crab.actions.push(new UpAction(this.game, this.crab,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.crab.actions.push(new UpHire(this.game, this.crab,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.sand.addProductor(new Production(this.crab))

    //    Crab Farmer
    this.crabFarmer.actions.push(new BuyAction(this.game,
      this.crabFarmer,
      [
        new Cost(this.game.baseWorld.food, new Decimal(1E3), this.game.buyExp),
        new Cost(this.game.baseWorld.sand, new Decimal(100), this.game.buyExp),
        new Cost(this.crab, new Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.crabFarmer.actions.push(new UpAction(this.game, this.crabFarmer,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.crabFarmer.actions.push(new UpHire(this.game, this.crabFarmer,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.fungus.addProductor(new Production(this.crabFarmer))
    this.game.baseWorld.sand.addProductor(new Production(this.crabFarmer, new Decimal(-1)))

    const specialProduction = new Decimal(15)
    const specialCost = new Decimal(-4)
    const specialFood = new Decimal(1E7)
    const specialRes2 = new Decimal(1E4)

    //    Crab Scientist
    this.crabScientist.actions.push(new BuyAction(this.game,
      this.crabScientist,
      [
        new Cost(this.game.baseWorld.food, specialFood.div(5), this.game.buyExp),
        new Cost(this.game.baseWorld.sand, specialRes2.div(5), this.game.buyExp),
        new Cost(this.crab, new Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.crabScientist.actions.push(new UpAction(this.game, this.crabScientist,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3.times(1.5), this.game.upgradeScienceExp)]))
    this.crabScientist.actions.push(new UpHire(this.game, this.crabScientist,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3.times(1.5), this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.science.addProductor(new Production(this.crabScientist, specialProduction.times(0.75)))
    this.game.baseWorld.sand.addProductor(new Production(this.crabScientist, specialCost))

    //    Crab Queen ?!
    //    Not sure if really exists
    this.crabQueen.actions.push(new BuyAndUnlockAction(this.game,
      this.crabQueen,
      [
        new Cost(this.game.baseWorld.food, new Decimal(1E5), this.game.buyExp),
        new Cost(this.crab, new Decimal(50), this.game.buyExpUnit)
      ], [this.crabNest]
    ))
    this.crabQueen.actions.push(new UpAction(this.game, this.crabQueen,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.crabQueen.actions.push(new UpHire(this.game, this.crabQueen,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]))
    this.crab.addProductor(new Production(this.crabQueen))

    //    Crab Nest
    this.crabNest.actions.push(new BuyAction(this.game,
      this.crabNest,
      [
        new Cost(this.game.baseWorld.food, this.game.baseWorld.prestigeFood.div(1.5), this.game.buyExp),
        new Cost(this.game.baseWorld.sand, this.game.baseWorld.prestigeOther1.times(2), this.game.buyExp),
        new Cost(this.crabQueen, new Decimal(250), this.game.buyExpUnit)
      ]
    ))
    this.crabNest.actions.push(new UpAction(this.game, this.crabNest,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))
    this.crabNest.actions.push(new UpHire(this.game, this.crabNest,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceHireExp)]))

    this.crabQueen.addProductor(new Production(this.crabNest))

    //    Shrimp
    this.shrimp.actions.push(new BuyAction(this.game,
      this.shrimp,
      [new Cost(this.game.baseWorld.food, new Decimal(3E3), this.game.buyExp)]
    ))
    this.shrimp.actions.push(new UpAction(this.game, this.shrimp,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.shrimp.actions.push(new UpHire(this.game, this.shrimp,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.sand.addProductor(new Production(this.shrimp))
    this.game.baseWorld.crystal.addProductor(new Production(this.shrimp, new Decimal(0.5)))

    //    lobster
    const lobsterScience = this.game.scienceCost3.times(1.5)

    this.lobster.actions.push(new BuyAction(this.game,
      this.lobster,
      [
        new Cost(this.game.baseWorld.food, this.game.machines.price1.times(5000), this.game.buyExp),
        new Cost(this.game.baseWorld.sand, this.game.machines.price1.times(1.5), this.game.buyExp)
      ]
    ))
    this.lobster.actions.push(new UpAction(this.game, this.lobster,
      [new Cost(this.game.baseWorld.science, lobsterScience, this.game.upgradeScienceExp)]))
    this.lobster.actions.push(new UpHire(this.game, this.lobster,
      [new Cost(this.game.baseWorld.science, lobsterScience, this.game.upgradeScienceHireExp)]))

    this.game.baseWorld.sand.addProductor(new Production(this.lobster, this.game.machines.machineryProd.div(5)))
    this.game.baseWorld.crystal.addProductor(new Production(this.lobster, this.game.machines.machineryProd.div(10)))
  }
  addWorld() {

    World.worldTypes.push(
      new World(this.game, "海滩", "一个海滩",
        [this.game.machines.sandDigger, this.game.engineers.sandEnginer],
        [],
        [new Cost(this.game.beach.crabNest, new Decimal(50))],
        [],
        [],
        [[this.game.beach.seaRes, new Decimal(0)]],
        new Decimal(3)
      ))

    World.worldPrefix.push(
      new World(this.game, "海岸", "",
        [this.game.machines.sandDigger, this.game.engineers.sandEnginer],
        [[this.game.baseWorld.sand, new Decimal(1.5)], [this.game.baseWorld.fungus, new Decimal(0.7)]],
        [new Cost(this.game.beach.crabNest, new Decimal(50))],
        [[this.game.baseWorld.fungus, new Decimal(0.7)]],
        [],
        [[this.game.beach.seaRes, new Decimal(0)]],
        new Decimal(3.5)
      ))

  }

}

