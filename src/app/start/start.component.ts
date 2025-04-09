import { Component, EventEmitter, Output } from '@angular/core';
import { powerups } from '../data/powerups';
import { MatButtonModule } from '@angular/material/button';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  @Output() setTotalScore = new EventEmitter<number>();

  currentScore = 0;
  currentInceremt = 1;
  boosterName = "";
  notUsedPowerUps = powerups;
  gifSource = ['/assets/gifFrames/frame_00_delay-0.03s.gif',
    '/assets/gifFrames/frame_01_delay-0.03s.gif',  
    '/assets/gifFrames/frame_02_delay-0.03s.gif', '/assets/gifFrames/frame_03_delay-0.03s.gif', 
    '/assets/gifFrames/frame_04_delay-0.03s.gif', '/assets/gifFrames/frame_05_delay-0.03s.gif', 
    '/assets/gifFrames/frame_06_delay-0.03s.gif', '/assets/gifFrames/frame_07_delay-0.03s.gif', 
    '/assets/gifFrames/frame_08_delay-0.03s.gif', '/assets/gifFrames/frame_09_delay-0.03s.gif',
    '/assets/gifFrames/frame_10_delay-0.03s.gif', '/assets/gifFrames/frame_11_delay-0.03s.gif',
    '/assets/gifFrames/frame_12_delay-0.03s.gif', '/assets/gifFrames/frame_13_delay-0.03s.gif',
    '/assets/gifFrames/frame_15_delay-0.03s.gif', '/assets/gifFrames/frame_16_delay-0.03s.gif',
    '/assets/gifFrames/frame_17_delay-0.03s.gif', '/assets/gifFrames/frame_18_delay-0.03s.gif', 
    '/assets/gifFrames/frame_19_delay-0.03s.gif', '/assets/gifFrames/frame_20_delay-0.03s.gif',
    '/assets/gifFrames/frame_21_delay-0.03s.gif', '/assets/gifFrames/frame_22_delay-0.03s.gif',
    '/assets/gifFrames/frame_23_delay-0.03s.gif', '/assets/gifFrames/frame_24_delay-0.03s.gif',
    '/assets/gifFrames/frame_25_delay-0.03s.gif', '/assets/gifFrames/frame_26_delay-0.03s.gif',
    '/assets/gifFrames/frame_27_delay-0.03s.gif', '/assets/gifFrames/frame_28_delay-0.03s.gif',
    '/assets/gifFrames/frame_29_delay-0.03s.gif']
  currentFrameIndex = 0;


  updateScore(incremntAmount: number){
    this.currentScore += incremntAmount;
    const pUp = this.notUsedPowerUps.find(p => p.score <= this.currentScore);
    if(pUp){
      this.boosterName = pUp.booster;
    }
    this.currentFrameIndex = (this.currentFrameIndex + 1)%this.gifSource.length;
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
