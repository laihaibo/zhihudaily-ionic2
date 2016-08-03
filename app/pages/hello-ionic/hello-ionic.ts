import {Component} from '@angular/core';
import {Storage, LocalStorage,NavParams,NavController,ViewController,Slides} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {StoryDetailsPage} from '../story-details/story-details';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  mySlideOptions = {
    autoplay: 3000,
    initialSlide: 0,
    loop: true,
  };
  local: Storage;
  // stories:Array<{id:number,type:number,images:string,ga_prefix:string,title:string,}>;
  all_stories:Array<{date:string,stories:Array<{id:number,type:number,images:string,ga_prefix:string,title:string,}>}>;
  top_stories:Array<{id:number,type:number,images:string,ga_prefix:string,title:string,}>;
  constructor(private http: Http, private params: NavParams, private navCtrl: NavController,private viewCtrl: ViewController) {
    this.navCtrl = navCtrl;
    this.viewCtrl = viewCtrl;
    this.local = new Storage(LocalStorage);
    this.top_stories = [];
    // this.stories=[];
    this.all_stories=[]

    this.http.get('http://news-at.zhihu.com/api/4/news/latest').map(res => res.json()).subscribe(data => {
      var acceptStories = [];
      for (var i = 0; i < data.top_stories.length; i++) {
        this.top_stories.push({
          id: data.top_stories[i].id,
          type: data.top_stories[i].type,
          ga_prefix: data.top_stories[i].ga_prefix,
          images: data.top_stories[i].image.replace(/http[s]*:\/\//,'//images.weserv.nl/?url='),
          title: data.top_stories[i].title
        });

      }
      for (var i = 0; i < data.stories.length; i++) {
        acceptStories.push({
          id: data.stories[i].id,
          type: data.stories[i].type,
          ga_prefix: data.stories[i].ga_prefix,
          images: data.stories[i].images[0].replace(/http[s]*:\/\//,'//images.weserv.nl/?url='),
          title: data.stories[i].title
        });

      }
      this.all_stories.push({
        date: data.date,
        stories: acceptStories
      });
    });
  }

  onPageWillEnter() {
    //页面初始化的一些事情
    // console.log("HomePage: page will enter");
    // this.http.get('http://news-at.zhihu.com/api/4/news/latest').subscribe(data=>{
    //   console.log(data.json());
    // });
  //   this.http.get('http://news-at.zhihu.com/api/4/news/latest').map(res=>res.json()).subscribe(data => {
  //     // console.log(data);
  //     var acceptStories=[];
  //     for (var i = 0; i < data.stories.length; i++) {
  //       acceptStories.push({
  //       id: data.stories[i].id,
  //       type:data.stories[i].type,
  //       ga_prefix:data.stories[i].ga_prefix,
  //       images:data.stories[i].images[0].slice(7),
  //       title:data.stories[i].title
  //     });
        
  //     }
  //  this.all_stories.push({
  //       date:data.date,
  //       stories:acceptStories
  //     });
  //     // console.log(acceptStories);
  //   });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.http.get('http://news-at.zhihu.com/api/4/news/latest').map(res => res.json()).subscribe(data => {
      var newStories = [];
      var newTopStories=[];
      for (var i = 0; i < data.top_stories.length; i++) {
        newTopStories.push({
          id: data.top_stories[i].id,
          type: data.top_stories[i].type,
          ga_prefix: data.top_stories[i].ga_prefix,
          images: data.top_stories[i].image.replace(/http[s]*:\/\//,'//images.weserv.nl/?url='),
          title: data.top_stories[i].title
        });

      }
      this.top_stories = newTopStories;
      for (var i = 0; i < data.stories.length; i++) {
        newStories.push({
          id: data.stories[i].id,
          type: data.stories[i].type,
          ga_prefix: data.stories[i].ga_prefix,
          images: data.stories[i].images[0].replace(/http[s]*:\/\//,'//images.weserv.nl/?url='),
          title: data.stories[i].title
        });

      }
      this.all_stories[0].stories=newStories;
      refresher.complete();
    });

    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }
    storyShow(event, story) {
    this.navCtrl.push(StoryDetailsPage, {
      story: story
    });
  }
  loadMore() {
    var today = this.all_stories[this.all_stories.length-1].date;
    // var preday = today.split('').splice(3,0,'/');
    // console.log(preday);
    // var now = new Date();
    // console.log(preday);
    console.log('Begin async operation');
    this.http.get('http://news.at.zhihu.com/api/4/news/before/'+today).map(res=>res.json()).subscribe(data => {
      console.log(data.date);
      var acceptStories = [];
      for (var i = 0; i < data.stories.length; i++) {
        acceptStories.push({
          id: data.stories[i].id,
          type: data.stories[i].type,
          ga_prefix: data.stories[i].ga_prefix,
          images: data.stories[i].images[0].replace(/http[s]*:\/\//,'//images.weserv.nl/?url='),
          title: data.stories[i].title
        });

      }
      this.all_stories.push({
        date: data.date,
        stories: acceptStories
      });
    });

    // setTimeout(() => {
    //   for (var i = 0; i < 30; i++) {
    //     this.items.push( this.items.length );
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }
}
