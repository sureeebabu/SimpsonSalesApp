import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';

import { FileuploadPage } from '../fileupload/fileupload';
import { ReviewDetailsPage } from '../review-details/review-details';
/**
 * Generated class for the CreditTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'page-credit-tabs',
  templateUrl: 'credit-tabs.html',
})
export class CreditTabsPage {

	public Mid:any;
	public typee:any;
	public Id:any; 
	public Uid:any;
	public Custcode:any;
	public Sid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public storage: Storage, public alertCtrl: AlertController) {
	this.Mid = this.navParams.get('Mid');
	this.CteditListList(this.Mid);
	this.storage.set(MEDIA_FILES_KEY,'');
	localStorage.removeItem('audiolist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditTabsPage');
  }
CteditListList(Sid)
{
alert(Sid);

	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/SalesAppAPI/WarrentyList.php?Sid='+Sid); 
	data.subscribe(result=>{
	this.typee = result;
	}, (error) => {
		alert(JSON.stringify(error));
	});

}
  onChange(ClaimValue)
  {
  if(ClaimValue!='Empty')
  {
  	var splitData = ClaimValue.split('~');

let altsuccess = this.alertCtrl.create({
	title: 'Alert',
	message: 'Are you sure to update status..!',
	buttons: [
	{
	text: 'OK',
	handler: () => 
	{
 var link = 'http://simpsonwms.arkaautomaations.com/SalesAppAPI/ClaimStatusUp.php';
 var myData = JSON.stringify({WarrantyClaim: splitData[0],InvoiceNo: splitData[1],ClaimDetId: splitData[2]});
 this.http.post(link, myData)
 .subscribe(data => {
 
 }, error => {
 console.log(error);
 });
this.ionViewWillEnter();
 
	}
	},
		{
	text: 'Cancel',
	handler: () => 
	{
	}
	}
	]
	});
	altsuccess.present();
	}		
  }
ViewData(Vid,SValue)
{
	this.navCtrl.push(ReviewDetailsPage,{Vid:Vid,Svalue:SValue});
}
UploadData(Uid)
{
	this.navCtrl.push(FileuploadPage,{Uid:Uid,Mid:this.Mid});
}
ionViewWillEnter()
{
this.CteditListList(this.Mid);
}
}
