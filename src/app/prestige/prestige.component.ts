import { Cost } from '../model/cost';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from '../model/world';
import { GameService } from '../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrls: ['./prestige.component.scss']
})
export class PrestigeComponent implements OnInit {

  skip = false

  constructor(
    public gameService: GameService,
    private router: Router) {
    gameService.game.setMaxLevel()
  }

  ngOnInit() {
  }
  skipWorld() { this.skip = true }
  getTitle() {
    if (this.skip)
      return "你正在跳过这个世界！"
    else {
      if (!this.travelAv())
        return "你还不能去到一个新的世界"
      else
        return "在这里，你可以到一个崭新的世界"
    }
  }
  travelAv(): boolean {

    // return this.skip || (this.gameService.game.research.prestigeResearch.owned() &&
    //   this.gameService.game.world.prestige.getBuyMax().greaterThan(0) &&
    //   (this.gameService.game.world.toUnlockMax.length === 0 ||
    //     !!this.gameService.game.world.toUnlockMax.find(tum => tum.basePrice.greaterThan(tum.unit.quantity))))

    if (this.skip)
      return true

    if (!this.gameService.game.research.prestigeResearch.owned())
      return false

    let currentPrice: Cost

    const size1 = this.gameService.game.world.toUnlock.length
    for (let i = 0; i < size1; i++) {
      currentPrice = this.gameService.game.world.toUnlock[i]
      if (currentPrice.basePrice.greaterThan(currentPrice.unit.quantity)) {
        return false
      }

    }
    const size2 = this.gameService.game.world.toUnlockMax.length
    for (let i = 0; i < size2; i++) {
      currentPrice = this.gameService.game.world.toUnlockMax[i]
      if (currentPrice.basePrice.lessThan(currentPrice.unit.quantity))
        return false

    }
    return true
  }
  goTo(world: World) {
    world.goTo(this.skip)
    this.router.navigateByUrl('/')
  }
  change() {
    this.gameService.game.generateRandomWorld()
  }
}
