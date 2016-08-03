import {Component} from '@angular/core';
import {NavController,NavParams,Storage, LocalStorage,Toast} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/story-details/story-details.html'
})

export class StoryDetailsPage {
    story;
    local:Storage;
    collections:Array<{id:string,collection:Array<{id:number,type:number,images:string,ga_prefix:string,title:string,body:string,topImage:string,topImage_source:string,collectFlg:boolean}>}>;
    constructor(private params: NavParams,private navCtrl: NavController,private http: Http) {
        this.story = params.data.story;
        // this.story.collection = false;
        // console.log(this.story.id);
                                this.collections=[];
        this.local= new Storage(LocalStorage);
        this.local.get('collections').then(result=>{
            if (result) {
             this.collections=JSON.parse(result);
            }
        });
        
        this.navCtrl=navCtrl;
    }

    onPageWillEnter(){

                    this.http.get('http://news-at.zhihu.com/api/4/news/'+this.story.id).map(res=>res.json()).subscribe(data => {
                    console.log(data);
                    this.story.body = data.body.replace(/http[s]*:\/\/pic[1-4]{1}/g,'//images.weserv.nl/?url=pic3');
                    this.story.topImage = data.image.slice(7);
                    this.story.topImage_source=data.image_source;
                });

    }

    collect(event){
        console.log(this.story.collectFlag);
        console.log(event.target.innerHTML);
        if (this.story.collectFlag==false) {
            event.target.innerHTML='<ion-icon name="star" role="img" class="ion-ios-star" aria-label="star outline" ng-reflect-name="star"></ion-icon>';
            this.story.collectFlag=true;
            // console.log(this.story);
            this.collections.unshift({id:this.story.id,collection:this.story});
            this.local.set('collections',JSON.stringify(this.collections));
            let toastSuccess = Toast.create({
          message: '收藏成功!',
          duration: 2000,
          position: 'middle'
        });
        this.navCtrl.present(toastSuccess);
        }else{
            event.target.innerHTML='<ion-icon name="star-outline" role="img" class="ion-ios-star-outline" aria-label="star outline" ng-reflect-name="star-outline"></ion-icon>';
            this.story.collectFlag=false;
            // this.local.get('collections').then((result)=>{
            //     for (var i = 0; i < this.collections.length; i++) {
            //         if(this.story.id==this.collections[i].id){
            //             this.collections[i]=null;
            //         }
            //     }
            // });
            // this.local.set('collections',JSON.stringify(this.collections));
        }
        
    }
}