import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';


@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string,id:string}>;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 0; i < 12; i++) {
      let lanmu = [{name:'日常心理学',id:'13'}, {name:'用户推荐日报',id:'12'}, {name:'电影日报',id:'3'}, {name:'不许无聊',id:'11'}, {name:'设计日报',id:'4'}, {name:'大公司日报',id:'5'},
    {name:'财经日报',id:'6'}, {name:'互联网安全',id:'10'}, {name:'开始游戏',id:'2'}, {name:'音乐日报',id:'7'},{name:'动漫日报',id:'9'},{name:'体育日报',id:'8'}];
      this.items.push({
        title: lanmu[i].name,
        id:lanmu[i].id,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
