import { TogableProduction } from '../units/togableProductions';
import { Production } from '../production';
import { WorldInterface } from './worldInterface';
import { Unit } from '../units/unit';
import { GameModel } from '../gameModel';
import { BuyAction, BuyAndUnlockAction, UpAction, UpHire, UpSpecial, Research } from '../units/action';
import { Cost } from '../cost';
import { TypeList } from '../typeList';
import { World } from '../world';

export class Science implements WorldInterface {

  student: Unit
  scientist: Unit
  university: Unit
  depEdu: Unit

  listScience = Array<Unit>()

  studentProduction: Production
  scientistProduction: Production
  science1Production: Production
  science2Production: Production

  uniProduction: Production

  constructor(public game: GameModel) { }

  public declareStuff() {
    this.student = new Unit(this.game, "scn", "学生",
      "学生生产科学。")
    // this.student.types = [Type.Ant, Type.Scientist]

    this.scientist = new Unit(this.game, "scie2", "科学家蚂蚁",
      "将水晶变成科学。")

    this.university = new Unit(this.game, "univ", "大学",
      "大学生产科学。")

    this.depEdu = new Unit(this.game, "depEdu", "教育部门",
      "教育部门建立大学。")

    this.listScience = [this.student, this.scientist, this.university, this.depEdu]
    this.game.lists.push(new TypeList("科学", this.listScience))

    this.studentProduction = new Production(this.university, Decimal(0.2), false)
    this.scientistProduction = new Production(this.university, Decimal(0.1), false)
    this.science1Production = new Production(this.university, Decimal(450))
    this.science2Production = new Production(this.university, Decimal(1000), false)
    this.uniProduction = new Production(this.university, Decimal(0.1), false)
  }

  public initStuff() {

    this.game.baseWorld.science.addProductor(new Production(this.student))
    this.game.baseWorld.crystal.addProductor(new Production(this.student, Decimal(-0.5)))

    this.university.addProductor(new Production(this.depEdu, Decimal(0.1)))
    this.game.baseWorld.science.addProductor(new Production(this.depEdu, Decimal(-1E5)))

    const specialProduction = Decimal(15)
    const specialCost = Decimal(-4)
    const specialFood = Decimal(1E7)
    const specialRes2 = Decimal(1E4)

    //    Student
    this.student.actions.push(new BuyAndUnlockAction(this.game,
      this.student,
      [
        new Cost(this.game.baseWorld.food, Decimal(1000), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.crystal, Decimal(100), Decimal(this.game.buyExp)),
        new Cost(this.game.baseWorld.littleAnt, Decimal(1), Decimal(this.game.buyExpUnit))
      ],
      [this.game.baseWorld.science]
    ))

    this.student.actions.push(new UpAction(this.game, this.student,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceExp)]))
    this.student.actions.push(new UpHire(this.game, this.student,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost2, this.game.upgradeScienceHireExp)]))

    //  Scientist
    // this.scientist.types = [Type.Ant]
    this.scientist.actions.push(new BuyAction(this.game,
      this.scientist,
      [
        new Cost(this.game.baseWorld.food, specialFood.div(5), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, specialRes2.div(5), this.game.buyExp),
        new Cost(this.game.baseWorld.littleAnt, Decimal(1), this.game.buyExpUnit)
      ]
    ))
    this.game.baseWorld.science.addProductor(new Production(this.scientist, specialProduction.times(2)))
    this.game.baseWorld.crystal.addProductor(new Production(this.scientist, specialCost))

    this.scientist.actions.push(new UpAction(this.game, this.scientist,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceExp)]))
    this.scientist.actions.push(new UpHire(this.game, this.scientist,
      [new Cost(this.game.baseWorld.science, this.game.scienceCost3, this.game.upgradeScienceHireExp)]))

    //  University
    this.university.actions.push(new BuyAction(this.game,
      this.university,
      [
        new Cost(this.game.baseWorld.wood, this.game.machines.price1.times(2), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.game.machines.price2.times(2), this.game.buyExp)
      ]
    ))

    this.game.baseWorld.science.addProductor(this.science1Production)
    this.game.baseWorld.crystal.addProductor(new Production(this.university, specialCost.times(10)))

    this.student.addProductor(this.studentProduction)
    this.scientist.addProductor(this.scientistProduction)

    this.university.togableProductions = [
      new TogableProduction("生产学生", [this.studentProduction]),
      new TogableProduction("生产科学家", [this.scientistProduction])
    ]

    //  Dep
    this.depEdu.actions.push(new BuyAction(this.game,
      this.depEdu,
      [
        new Cost(this.university, Decimal(100), this.game.buyExpUnit),
        new Cost(this.game.baseWorld.wood, this.game.machines.price1.times(100), this.game.buyExp),
        new Cost(this.game.baseWorld.crystal, this.game.machines.price2.times(100), this.game.buyExp),
        new Cost(this.game.baseWorld.science, this.game.machines.price1.times(100), this.game.buyExp),
      ]
    ))

  }

  public addWorld() {
  }
}
