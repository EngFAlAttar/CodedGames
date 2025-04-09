import { Component, EventEmitter, Output } from '@angular/core';
import { powerups } from '../data/powerups';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  @Output() setTotalScore = new EventEmitter<number>();

  currentScore = 0;
  currentInceremt = 1;
  boosterName = "";
  notUsedPowerUps = powerups;

  updateScore(incremntAmount: number){
    this.currentScore += incremntAmount;
    const pUp = this.notUsedPowerUps.find(p => p.score <= this.currentScore);
    if(pUp){
      this.boosterName = pUp.booster;
    }
  }

  setPowerup(name: string){
    const pUp = this.notUsedPowerUps.find(p => p.booster == name);
    console.log("pwering up: ", pUp);
    if(pUp){
      this.currentInceremt = pUp?.incrementAmount;
      this.notUsedPowerUps = this.notUsedPowerUps.filter(p => p.booster != pUp.booster);
    }
  }
}
