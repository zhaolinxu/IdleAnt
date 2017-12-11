import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Infestation implements WorldInterface {

  poisonousPlant: Unit
  poisonousPlant2: Unit
  weedkiller: Unit
  chemistAnt: Unit
  disinfestationAnt: Unit
  flametrowerAnt: Unit

  disinfestationBeetle: Unit
  flametrowerBeetle: Unit

  chemistBee: Unit

  basicDisinfestationRes: Research
  flametrowerRes: Research
  weedkillerRes: Research

  listInfestation = new Array<Unit>()

  constructor(public game: GameModel) { }

  public declareStuff() {

    this.listInfestation = new Array<Unit>()

    this.poisonousPlant = new Unit(this.game, "poisPlant", "有毒植物",
      "这种植物可以把他们全部杀死。")
    this.poisonousPlant2 = new Unit(this.game, "poisPlant2", "老有毒植物",
      "处理有毒植物！")
    this.disinfestationAnt = new Unit(this.game, "defAnt", "消灭者蚂蚁",
      "摧毁有毒植物。")
    this.flametrowerAnt = new Unit(this.game, "flameAnt", "火焰蚂蚁",
      "烧掉有毒植物。")
    this.weedkiller = new Unit(this.game, "weedkiller", "除草剂",
      "有效地破坏有毒植物。")
    this.chemistAnt = new Unit(this.game, "chemistAnt", "化学家蚂蚁",
      "处理除草剂。")
    this.disinfestationBeetle = new Unit(this.game, "disinfestationBeetle", "杀虫甲壳虫",
      "甲壳虫也擅长杀死植物。")
    this.flametrowerBeetle = new Unit(this.game, "flametrowerBeetle", "火焰喷射器甲壳虫",
      "具有火焰喷射器的甲虫。")
    this.chemistBee = new Unit(this.game, "chemistBee", "化学家蜜蜂",
      "化学家蜜蜂。")
    this.poisonousPlant2.alwaysOn = true

    this.listInfestation.push(this.poisonousPlant2)
    this.listInfestation.push(this.poisonousPlant)
    this.listInfestation.push(this.weedkiller)
    this.listInfestation.push(this.chemistAnt)
    this.listInfestation.push(this.disinfestationAnt)
    this.listInfestation.push(this.flametrowerAnt)
    this.listInfestation.push(this.disinfestationBeetle)
    this.listInfestation.push(this.flametrowerBeetle)
    this.listInfestation.push(this.chemistBee)

    this.game.lists.push(new TypeList("侵扰", this.listInfestation))

    //    Weedkiller
    this.weedkillerRes = new Research(
      "weedkillerRes",
      "除草剂", "除草剂会慢慢杀死有毒植物。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E4))],
      [this.weedkiller, this.chemistAnt],
      this.game
    )

    //    Flame
    this.flametrowerRes = new Research(
      "flametrowerRes",
      "喷火器", "烧掉有毒植物。",
      [new Cost(this.game.baseWorld.science, new Decimal(1E3))],
      [this.flametrowerAnt, this.flametrowerBeetle],
      this.game
    )

    //    Disinfestation
    this.basicDisinfestationRes = new Research(
      "basicDisinfestationRes",
      "杀灭", "解锁基本的灭虫单位。",
      [new Cost(this.game.baseWorld.science, new Decimal(100))],
      [
        this.disinfestationAnt, this.disinfestationBeetle,
        this.flametrowerRes, this.weedkillerRes
      ],
      this.game
    )
    this.basicDisinfestationRes.avabileBaseWorld = false

  }

  public initStuff() {

    this.poisonousPlant.addProductor(new Production(this.poisonousPlant2))
    this.poisonousPlant.addProductor(new Production(this.disinfestationAnt, new Decimal(-10)))
    this.poisonousPlant.addProductor(new Production(this.disinfestationBeetle, new Decimal(-12)))

    this.poisonousPlant.addProductor(new Production(this.flametrowerBeetle, new Decimal(-100)))
    this.game.baseWorld.wood.addProductor(new Production(this.flametrowerBeetle, new Decimal(-5)))

    this.poisonousPlant.addProductor(new Production(this.flametrowerAnt, new Decimal(-120)))
    this.game.baseWorld.wood.addProductor(new Production(this.flametrowerAnt, new Decimal(-5)))

    this.poisonousPlant.addProductor(new Production(this.weedkiller, new Decimal(-0.01)))
    this.game.baseWorld.fungus.addProductor(new Production(this.weedkiller, new Decimal(-0.01)))
    this.game.baseWorld.fungus.addProductor(new Production(this.chemistAnt, new Decimal(-10)))
    this.game.baseWorld.soil.addProductor(new Production(this.chemistAnt, new Decimal(-10)))
    this.weedkiller.addProductor(new Production(this.chemistAnt, new Decimal(0.1)))

    //  Disinfestation
    this.disinfestationAnt.actions.push(new BuyAction(this.game, this.disinfestationAnt,
      [
        new Cost(this.game.baseWorld.littleAnt, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.food, new Decimal(1000), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, new Decimal(100), this.game.buyExp)
      ]
    ))
    this.disinfestationAnt.actions.push(new UpAction(this.game, this.disinfestationAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.disinfestationAnt.actions.push(new UpHire(this.game, this.disinfestationAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))

    //  Flametrower
    this.flametrowerAnt.actions.push(new BuyAction(this.game, this.flametrowerAnt,
      [
        new Cost(this.game.baseWorld.littleAnt, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.food, new Decimal(12E3), this.game.buyExp),
        new Cost(this.game.baseWorld.wood, new Decimal(8E3), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, new Decimal(4E3), this.game.buyExp)
      ]
    ))
    this.flametrowerAnt.actions.push(new UpAction(this.game, this.flametrowerAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.flametrowerAnt.actions.push(new UpHire(this.game, this.flametrowerAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))

    //  Chemist
    this.chemistAnt.actions.push(new BuyAction(this.game, this.chemistAnt,
      [
        new Cost(this.game.baseWorld.littleAnt, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.food, new Decimal(12E3), this.game.buyExp),
        new Cost(this.game.baseWorld.fungus, new Decimal(1E5), this.game.buyExp),
        new Cost(this.game.baseWorld.soil, new Decimal(6E4), this.game.buyExp)
      ]
    ))
    this.chemistAnt.actions.push(new UpAction(this.game, this.chemistAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))
    this.chemistAnt.actions.push(new UpHire(this.game, this.chemistAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost4, this.game.upgradeScienceExp)]))

    //    Beetle
    this.disinfestationBeetle.actions.push(new BuyAction(this.game,
      this.disinfestationBeetle,
      [
        new Cost(this.game.forest.larva, new Decimal(1), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.wood, new Decimal(300), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(3000), this.game.buyExp)
      ]
    ))
    this.disinfestationBeetle.actions.push(new UpAction(this.game,
      this.disinfestationBeetle, [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.disinfestationBeetle.actions.push(new UpHire(this.game,
      this.disinfestationBeetle, [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.disinfestationBeetle.avabileBaseWorld = false

    //  Flametrower  Beetle
    this.flametrowerBeetle.actions.push(new BuyAction(this.game,
      this.flametrowerBeetle,
      [
        new Cost(this.game.forest.larva, new Decimal(1), this.game.buyExp),
        new Cost(this.game.baseWorld.wood, new Decimal(15E3), this.game.buyExp),
        new Cost(this.game.baseWorld.food, new Decimal(5E3), this.game.buyExp),
        new Cost(this.game.baseWorld.soil, new Decimal(6E4), this.game.buyExp)
      ]
    ))
    this.flametrowerBeetle.actions.push(new UpAction(this.game, this.flametrowerBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.flametrowerBeetle.actions.push(new UpHire(this.game, this.flametrowerBeetle,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.flametrowerBeetle.avabileBaseWorld = false
  }

  public addWorld() {
    World.worldPrefix.push(
      new World(this.game, "被感染的", "",
        [],
        [],
        [],
        [],
        [],
        [
          [this.poisonousPlant, new Decimal(1E7)],
          [this.poisonousPlant2, new Decimal(1E3)],
          [this.basicDisinfestationRes, new Decimal(0)]
        ],
        new Decimal(5.5),
        [new Cost(this.poisonousPlant, new Decimal(5E3))]
      )
    )

    World.worldSuffix.push(

      new World(this.game, "为患", "",
        [this.basicDisinfestationRes],
        [],
        [],
        [],
        [],
        [
          [this.poisonousPlant, new Decimal(1E7)],
          [this.poisonousPlant2, new Decimal(1E3)],
          [this.basicDisinfestationRes, new Decimal(0)]
        ],
        new Decimal(5.5),
        [new Cost(this.poisonousPlant, new Decimal(5E3))]
      )
    )

  }
}
