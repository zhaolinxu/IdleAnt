import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
// import { Type } from '../units/base';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Frozen implements WorldInterface {

  iceAnt: Unit
  iceDrillAnt: Unit
  iceMelter: Unit
  iceEngineer: Unit
  iceCompEngineer: Unit
  iceResearch: Research
  listFreezig = new Array<Unit>()

  constructor(public game: GameModel) { }

  public declareStuff() {
    this.listFreezig = new Array<Unit>()

    this.iceAnt = new Unit(this.game, "iceA", "制冰机",
      "收集冰块。")
    this.iceDrillAnt = new Unit(this.game, "iceDrill", "冰钻",
      "用冰钻装备蚂蚁以摧毁冰块。")
    this.iceMelter = new Unit(this.game, "iceMelter", "冰熔化器",
      "用火焰喷射器装备蚂蚁以摧毁冰块。")

    this.listFreezig.push(this.iceAnt)
    this.listFreezig.push(this.iceDrillAnt)
    this.listFreezig.push(this.iceMelter)


    const iceResearch2 = new Research(
      "iceRes2", "喷火器",
      "用火焰融化冰。",
      [new Cost(this.game.baseWorld.science, Decimal(800))],
      [this.iceMelter],
      this.game
    )

    this.iceResearch = new Research(
      "iceRes", "冰",
      "冰",
      [new Cost(this.game.baseWorld.science, Decimal(30))],
      [this.iceAnt, this.iceDrillAnt, iceResearch2],
      this.game
    )
    this.iceResearch.avabileBaseWorld = false

    this.game.lists.push(new TypeList("冻结", this.listFreezig))
  }

  public initStuff() {
    //  Ice Provisioner
    this.game.baseWorld.ice.addProductor(new Production(this.iceAnt))
    this.iceAnt.actions.push(new BuyAction(this.game,
      this.iceAnt,
      [
        new Cost(this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
      ]
    ))
    this.iceAnt.actions.push(new UpAction(this.game, this.iceAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.iceAnt.actions.push(new UpHire(this.game, this.iceAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))

    //  Ice Driller
    this.game.baseWorld.ice.addProductor(new Production(this.iceDrillAnt, Decimal(-10)))
    this.iceDrillAnt.actions.push(new BuyAction(this.game,
      this.iceDrillAnt,
      [
        new Cost(this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
      ]
    ))
    this.iceDrillAnt.actions.push(new UpAction(this.game, this.iceDrillAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.iceDrillAnt.actions.push(new UpHire(this.game, this.iceDrillAnt,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))

    // Ice Melter
    this.game.baseWorld.ice.addProductor(new Production(this.iceMelter, Decimal(-100)))
    this.game.baseWorld.wood.addProductor(new Production(this.iceMelter, Decimal(-5)))
    this.iceMelter.actions.push(new BuyAction(this.game,
      this.iceMelter,
      [
        new Cost(this.game.baseWorld.food, Decimal(1E7), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.wood, Decimal(1E4), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
      ]
    ))
    this.iceMelter.actions.push(new UpAction(this.game, this.iceMelter,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.iceMelter.actions.push(new UpHire(this.game, this.iceMelter,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
  }

  public addWorld() {
    World.worldPrefix.push(

      new World(this.game, "寒冷", "",
        [],
        [
          [this.game.baseWorld.food, Decimal(0.6)],
          [this.game.baseWorld.ice, Decimal(0.5)]
        ],
        [],
        [],
        [],
        [[this.iceResearch, Decimal(0)]],
        Decimal(3)
      ),
      new World(this.game, "冻结", "",
        [
          this.game.machines.iceCollector,
          this.game.machines.iceCompacter,
          this.game.engineers.iceCompEngineer,
          this.game.engineers.iceCompEngineer,
          this.game.machines.burningGlass,
          this.game.engineers.lensEnginer
        ],
        [
          [this.game.baseWorld.food, Decimal(0.3)]
        ],
        [],
        [],
        [],
        [[this.game.baseWorld.ice, Decimal(1E11)],
        [this.iceResearch, Decimal(0)]],
        Decimal(4.5),
        [new Cost(this.game.baseWorld.ice, Decimal(100))]
      ),

    )

  }
}
