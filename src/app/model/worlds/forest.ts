import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Forest implements WorldInterface {

  larva: Unit
  beetle: Unit
  ambrosiaBeetle: Unit
  powderpostBeetle: Unit
  ladybird: Unit
  beetleNest: Unit
  beetleColony: Unit
  beetleResearch: Research
  listForest = new Array<Unit>()

  beetleCrystalProduction: Production
  beetleSoilProduction: Production
  beetleWoodProduction: Production

  constructor(public game: GameModel) { }

  declareStuff() {
    this.listForest = new Array<Unit>()

    this.larva = new Unit(this.game, "larva", "幼虫",
      "幼虫是许多昆虫的少年形式。")
    this.beetle = new Unit(this.game, "beetle", "甲虫",
      "甲虫生产各种资源。")
    this.ambrosiaBeetle = new Unit(this.game, "ambrosiaBeetle", "豚草甲虫",
      "豚草甲虫产木材。")
    this.beetleNest = new Unit(this.game, "beetleNest", "甲壳虫巢",
      "甲壳虫巢生产幼虫。")
    this.ladybird = new Unit(this.game, "ladybird", "瓢虫",
      "瓢虫生产科学。")
    this.beetleColony = new Unit(this.game, "beetleColony", "甲虫殖民地",
      "甲壳虫殖民地生产虫巢。")
    this.powderpostBeetle = new Unit(this.game, "powder", "粉虱甲虫",
      "粉虱甲虫是一群木材甲虫。")

    this.listForest.push(this.beetleColony)
    this.listForest.push(this.beetleNest)
    this.listForest.push(this.beetle)
    this.listForest.push(this.larva)
    this.listForest.push(this.powderpostBeetle)
    this.listForest.push(this.ambrosiaBeetle)
    this.listForest.push(this.ladybird)

    this.game.lists.push(new TypeList("甲虫", this.listForest))

    this.beetleWoodProduction = new Production(this.beetle, new Decimal(0.4), false)
    this.beetleSoilProduction = new Production(this.beetle, new Decimal(0.2), false)
    this.beetleCrystalProduction = new Production(this.beetle, new Decimal(0.1), false)

    const beetleWood = new Research("beetleWood", "伐木训练",
      "甲虫也生产木材",
      [new Cost(this.game.baseWorld.science, new Decimal(500))],
      [this.beetleWoodProduction],
      this.game
    )
    const beetleSoil = new Research("beetleSoil", "土壤训练",
      "甲虫也生产土壤",
      [new Cost(this.game.baseWorld.science, new Decimal(5E4))],
      [this.beetleSoilProduction],
      this.game
    )
    const beetleCrystal = new Research("beetleCrystal", "采矿培训",
      "甲虫也产生水晶",
      [new Cost(this.game.baseWorld.science, new Decimal(1E6))],
      [this.beetleCrystalProduction],
      this.game
    )

    const advancedBeetle = new Research("advBeetle",
      "高级甲虫作业", "更多的甲虫工作",
      [new Cost(this.game.baseWorld.science, new Decimal(3E3))],
      [this.ambrosiaBeetle, this.ladybird],
      this.game
    )
    this.beetleResearch = new Research("beetleRes",
      "甲虫", "解锁甲壳虫",
      [new Cost(this.game.baseWorld.science, new Decimal(600))],
      [this.larva, advancedBeetle, beetleWood, beetleSoil, beetleCrystal],
      this.game
    )
    this.beetleResearch.avabileBaseWorld = false

  }
  initStuff() {

    this.game.baseWorld.food.addProductor(new Production(this.larva, new Decimal(0.1)))

    this.game.baseWorld.food.addProductor(new Production(this.beetle))
    this.game.baseWorld.crystal.addProductor(this.beetleCrystalProduction)
    this.game.baseWorld.soil.addProductor(this.beetleSoilProduction)
    this.game.baseWorld.wood.addProductor(this.beetleWoodProduction)

    this.game.baseWorld.science.addProductor(new Production(this.ladybird, new Decimal(5)))

    this.game.baseWorld.fungus.addProductor(new Production(this.ambrosiaBeetle, new Decimal(-6)))
    this.game.baseWorld.wood.addProductor(new Production(this.ambrosiaBeetle, new Decimal(15)))

    this.beetle.addProductor(new Production(this.beetleNest, new Decimal(0.01)))
    this.larva.addProductor(new Production(this.beetleNest))
    this.beetleNest.addProductor(new Production(this.beetleColony, new Decimal(0.1)))

    this.game.baseWorld.food.addProductor(new Production(this.powderpostBeetle))
    this.game.baseWorld.wood.addProductor(new Production(this.powderpostBeetle))

    //    Larva
    this.larva.actions.push(new BuyAndUnlockAction(this.game,
      this.larva,
      [new Cost(this.game.baseWorld.food, new Decimal(10), this.game.buyExp)],
      [this.beetle, this.powderpostBeetle]
    ))
    this.larva.actions.push(new UpAction(this.game, this.larva,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost1, this.game.upgradeScienceExp)]))
    this.larva.actions.push(new UpHire(this.game, this.larva,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost1, this.game.upgradeScienceExp)]))

    //    Beetle
    this.beetle.actions.push(new BuyAndUnlockAction(this.game,
      this.beetle,
      [
        new Cost(this.larva, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.food, new Decimal(4000), this.game.buyExp)
      ],
      [this.beetleNest]
    ))
    this.beetle.actions.push(new UpAction(this.game, this.beetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.beetle.actions.push(new UpHire(this.game, this.beetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))

    //    Beetle Nest
    this.beetleNest.actions.push(new BuyAndUnlockAction(this.game,
      this.beetleNest,
      [
        new Cost(this.beetle, new Decimal(100), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.wood, new Decimal(1E4), this.game.buyExp),
        new Cost(this.game.baseWorld.soil, new Decimal(1E3), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(1E3), this.game.buyExp)
      ],
      [this.beetleColony]
    ))
    this.beetleNest.actions.push(new UpAction(this.game, this.beetleNest,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.beetleNest.actions.push(new UpHire(this.game, this.beetleNest,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))

    //    Beetle Colony
    this.beetleColony.actions.push(new BuyAction(this.game,
      this.beetleColony,
      [
        new Cost(this.beetleNest, new Decimal(200), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.food, new Decimal(1E10), this.game.buyExp),
        new Cost(this.game.baseWorld.wood, new Decimal(1E6), this.game.buyExp),
        new Cost(this.game.baseWorld.soil, new Decimal(1E5), this.game.buyExp),
        new Cost(this.game.baseWorld.fungus, new Decimal(5E4), this.game.buyExp),
      ]
    ))
    this.beetleColony.actions.push(new UpAction(this.game, this.beetleColony,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))
    this.beetleColony.actions.push(new UpHire(this.game, this.beetleColony,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))

    //    Lady Beetle
    this.ladybird.actions.push(new BuyAction(this.game,
      this.ladybird,
      [
        new Cost(this.larva, new Decimal(1), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, new Decimal(1E4), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(1E6), this.game.buyExp)
      ]
    ))
    this.ladybird.actions.push(new UpAction(this.game, this.ladybird,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.ladybird.actions.push(new UpHire(this.game, this.ladybird,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))


    //    Ambrosia Beetle
    this.ambrosiaBeetle.actions.push(new BuyAction(this.game,
      this.ambrosiaBeetle,
      [
        new Cost(this.larva, new Decimal(1), this.game.buyExp),
        new Cost(this.game.baseWorld.fungus, new Decimal(1E4), this.game.buyExp),
        new Cost(this.game.baseWorld.wood, new Decimal(1E4), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(1E7), this.game.buyExp)
      ]
    ))
    this.ambrosiaBeetle.actions.push(new UpAction(this.game, this.ambrosiaBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.ambrosiaBeetle.actions.push(new UpHire(this.game, this.ambrosiaBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))

    //    Powderpost
    this.powderpostBeetle.actions.push(new BuyAction(this.game,
      this.powderpostBeetle,
      [
        new Cost(this.larva, new Decimal(1), this.game.buyExp),
        new Cost(this.game.baseWorld.wood, new Decimal(1000), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(5000), this.game.buyExp)
      ]
    ))
    this.powderpostBeetle.actions.push(new UpAction(this.game, this.powderpostBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.powderpostBeetle.actions.push(new UpHire(this.game, this.powderpostBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
  }

  addWorld() {

    World.worldTypes.push(
      new World(this.game, "森林", "一片森林",
        [
          this.game.engineers.woodEnginer, this.game.machines.loggingMachine,
          this.game.infestation.disinfestationBeetle, this.game.infestation.flametrowerBeetle
        ],
        [[this.game.baseWorld.wood, new Decimal(2)]],
        [new Cost(this.beetleColony, new Decimal(50))],
        [],
        [],
        [[this.beetleResearch, new Decimal(0)]],
        new Decimal(3.5)
      )
    )

    World.worldSuffix.push(
      new World(this.game, "甲虫", "",
        [
          this.game.infestation.disinfestationBeetle, this.game.infestation.flametrowerBeetle
        ],
        [
          [this.larva, new Decimal(2)]
        ]
        ,
        [new Cost(this.beetleColony, new Decimal(50))],
        [],
        [],
        [[this.beetleResearch, new Decimal(0)]],
        new Decimal(4)
      )
    )

  }
}
