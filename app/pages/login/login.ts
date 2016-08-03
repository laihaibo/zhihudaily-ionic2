import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class Login {
    constructor(private navCtrl:NavController){
        this.navCtrl=navCtrl;
    }
    close(){
        this.navCtrl.pop();
    }
}