import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { LogoutPage } from '../logout/logout';
//import { WarrantyMasterPage } from '../warranty-master/warranty-master';
import { RegionListPage } from '../region-list/region-list';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Status:any='';
data:any = {};
public nation:any;
public disconnectSubscription:any;
  constructor(public navCtrl: NavController,  public navParams: NavParams, public http:HttpClient, public platform:Platform, public alertCtrl: AlertController, public network: Network) {
  this.platform = platform;
}

  listRegionRequest() {
  	this.nation= RegionListPage;
	this.PageNation();
  }
  ChangePasswordPage() {
  	this.nation= ChangePasswordPage;
	this.PageNation();
  }
  LogoutPage() {
  	this.nation= LogoutPage;
	this.PageNation();
  }

 
  ionViewDidEnter()
  {
	this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is disconnected..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		this.navCtrl.setRoot(HomePage);
		this.platform.exitApp();
		}
		}
		]
		});
		altsuccess.present();
		this.disconnectSubscription.unsubscribe();
		
		});

}
PageNation()
{
if(this.network.type=='none')
{
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is disconnected..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		this.navCtrl.setRoot(HomePage);
		this.platform.exitApp();
		}
		}
		]
		});
		altsuccess.present();
		

}
else
{
this.navCtrl.push(this.nation);
}
}
ionViewWillLeave(){
this.disconnectSubscription.unsubscribe();
}
}
