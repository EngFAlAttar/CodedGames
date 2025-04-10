import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Powerup, powerups } from '../data/powerups';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, MatSliderModule, FormsModule, NgStyle],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  animations: [
    trigger('activateBooster', [
        state('initial', style({
          opacity:1,
          transform: 'rotate(0deg)'
        })),
        state('clicked', style({
          opacity:1,
          transform: 'rotate(360deg)'
        })),
        transition('initial => clicked',[animate(
          '1s ease-in',
          keyframes([
            style({ transform: 'rotate(0deg)', opacity: 1, offset: 0 }),
            style({ transform: 'rotate(90deg)', opacity: 0.75, offset: 0.25 }),
            style({ transform: 'rotate(180deg)', opacity: 0.5, offset:  0.5}),
            style({ transform: 'rotate(270deg)', opacity: 0.25, offset: 0.75 }),
            style({ transform: 'rotate(360deg)', opacity: 0, offset: 1 }),
          ])
        )]),
      ]),
  ],
})
export class StartComponent {
  @Output() setTotalScore = new EventEmitter<number>();
  @HostListener('window:keydown.Space',['$event']) spaceButton(e:KeyboardEvent):void{
    // this.updateScore(this.currentInceremt);
  }
  currentScore = 0;
  maxDistance = 5000;
  currentInceremt = 1;
  boosterName = "";
  currentBooster?:Powerup;
  notUsedPowerUps = powerups;
  gifSource = ['/assets/splitGIF/frame_00_delay-0.03s.gif',
    '/assets/splitGIF/frame_01_delay-0.03s.gif',  
    '/assets/splitGIF/frame_02_delay-0.03s.gif', '/assets/splitGIF/frame_03_delay-0.03s.gif', 
    '/assets/splitGIF/frame_04_delay-0.03s.gif', '/assets/splitGIF/frame_05_delay-0.03s.gif', 
    '/assets/splitGIF/frame_06_delay-0.03s.gif', '/assets/splitGIF/frame_07_delay-0.03s.gif', 
    '/assets/splitGIF/frame_08_delay-0.03s.gif', '/assets/splitGIF/frame_09_delay-0.03s.gif',
    '/assets/splitGIF/frame_10_delay-0.03s.gif', '/assets/splitGIF/frame_11_delay-0.03s.gif',
    '/assets/splitGIF/frame_12_delay-0.03s.gif', '/assets/splitGIF/frame_13_delay-0.03s.gif',
    '/assets/splitGIF/frame_15_delay-0.03s.gif', '/assets/splitGIF/frame_16_delay-0.03s.gif',
    '/assets/splitGIF/frame_17_delay-0.03s.gif', '/assets/splitGIF/frame_18_delay-0.03s.gif', 
    '/assets/splitGIF/frame_19_delay-0.03s.gif', '/assets/splitGIF/frame_20_delay-0.03s.gif',
    '/assets/splitGIF/frame_21_delay-0.03s.gif', '/assets/splitGIF/frame_22_delay-0.03s.gif',
    '/assets/splitGIF/frame_23_delay-0.03s.gif', '/assets/splitGIF/frame_24_delay-0.03s.gif',
    '/assets/splitGIF/frame_25_delay-0.03s.gif', '/assets/splitGIF/frame_26_delay-0.03s.gif',
    '/assets/splitGIF/frame_27_delay-0.03s.gif', '/assets/splitGIF/frame_28_delay-0.03s.gif',
    '/assets/splitGIF/frame_29_delay-0.03s.gif']
  currentFrameIndex = 0;
boosterButtonState = 'initial';


  updateScore(incremntAmount: number){
    if(this.currentScore<this.maxDistance)
    {
      this.currentScore += incremntAmount;
      const pUp = this.notUsedPowerUps.find(p => p.score <= this.currentScore);
      if(pUp){
        this.currentBooster = pUp
        this.boosterName = pUp.booster;
      }
      this.currentFrameIndex = (this.currentFrameIndex + 1)%this.gifSource.length;
    }
    if(this.currentScore>=this.maxDistance)
    {
      this.changeIsland()
      Swal.fire({
        title: "You Did it!",
        text: "You have survived!!!",
        imageUrl:"https://img.freepik.com/premium-vector/pixel-art-illustration-confetti-pixelated-party-party-trumpet-icon-pixelated-pixel-art_1038602-615.jpg",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
   
  }

  setPowerup(name: string){
    this.boosterButtonState = 'clicked'
    const pUp = this.notUsedPowerUps.find(p => p.booster == name);
    console.log("pwering up: ", pUp);
    if(pUp){
      this.currentBooster = pUp;
      this.currentInceremt = pUp?.incrementAmount;
      this.notUsedPowerUps = this.notUsedPowerUps.filter(p => p.booster != pUp.booster);
    }
  }
  appliedBooster(){
    this.boosterButtonState = 'initial'
    this.currentBooster = undefined
 
 }
 changeIsland(){
  if(this.currentScore >= this.maxDistance){
    return {
      'width': '300px',
      'height': 'auto',
      'position': 'fixed',
      'right': '500px',
      'align-self': 'center',
      'margin-top': '5rem',
    };
}
else if(this.currentScore > this.maxDistance*0.9){
  return {
    'width': '300px',
    'height': 'auto',
    'position': 'fixed',
    'right': '200px',
    'align-self': 'center',
    'margin-top': '5rem',
  };
}
else if(this.currentScore > this.maxDistance*0.75){
    return {
      'width': '300px',
      'height': 'auto',
      'position': 'fixed',
      'right': '0px',
      'align-self': 'center',
      'margin-top': '5rem',
    };
}
 else if(this.currentScore > this.maxDistance*0.5){
      return {
        'width': '300px',
        'height': 'auto',
        'position': 'fixed',
        'right': '-100px',
        'align-self': 'center',
        'margin-top': '5rem',
      };
  }
  else if(this.currentScore > this.maxDistance*0.25){
      return {
        'width': '300px',
        'height': 'auto',
        'position': 'fixed',
        'right': '-150px',
        'align-self': 'center',
        'margin-top': '5rem',
      };
    }
  else if(this.currentScore > this.maxDistance*0.1){
    return {
      'width': '300px',
      'height': 'auto',
      'position': 'fixed',
      'right': '-200px',
      'align-self': 'center',
      'margin-top': '5rem',
    };
  }
    else{
      return{
        'visibility': 'hidden'
      }
  }
}
}
