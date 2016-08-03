import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {StoryDetailsPage} from '../story-details/story-details';


@Component({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(private navCtrl: NavController, navParams: NavParams,private http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

      onPageWillEnter(){
        this.http.get('http://news-at.zhihu.com/api/4/theme/'+this.selectedItem.id).map(res=>res.json()).subscribe(data => {
            console.log(data);
            // this.selectedItem.body = data.body.replace(/http[s]*:\/\/pic[1-4]{1}/g,'//images.weserv.nl/?url=pic3');
            // this.selectedItem.topImage = data.image.slice(7);
            // this.selectedItem.topImage_source=data.image_source;
            this.selectedItem.background = data.background.replace(/http[s]*:\/\/pic[1-4]{1}/g,'//images.weserv.nl/?url=pic3').replace(/http[s]*:\/\/p[1-4]{1}/g,'//images.weserv.nl/?url=p3');
            this.selectedItem.stories=data.stories;
            // console.log(this.selectedItem.stories)
        });
    }

        storyShow(event, story) {
    this.navCtrl.push(StoryDetailsPage, {
      story: story
    });
  }
}
