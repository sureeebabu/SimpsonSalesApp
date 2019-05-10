import { Component , ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
/*import { LoginRegTabPage } from '../pages/login-reg-tab/login-reg-tab';*/


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /*rootPage: any = LoginPage; */


  constructor(public platform: Platform,private statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public network: Network,public storage: Storage,public headerColor: HeaderColor,public screenOrientation: ScreenOrientation,public http:HttpClient) {
    this.initializeApp();
	
	if (this.platform.is('cordova')) {
	this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
	}
  }


  initializeApp() {
//	this.storage.set('Username','');
//	this.storage.set('user_id','');
this.storage.get('Username').then((val) => {
if(val==null || val==undefined)
{
	this.storage.set('Username','');
	this.storage.set('user_id','');
}
});
this.storage.get('user_id').then((val) => {
if(val==null || val==undefined)
{
	this.storage.set('Username','');
	this.storage.set('user_id','');
}
});

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#0b2d60');
		this.storageGet();
		this.splashScreen.hide();
		this.headerColor.tint('#1342c3');
	const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is disconnected..!..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		this.nav.setRoot(HomePage);
		this.platform.exitApp();
		}
		}
		]
		});
		altsuccess.present();		
		disconnectSubscription.unsubscribe();
		
		});
	const connectSubscription = this.network.onConnect().subscribe(() => {
 	console.log('network connected!');
  	setTimeout(() => {
		let altsuccess = this.alertCtrl.create({
		title: 'Alert',
		message: 'Network is connected..!..!',
		buttons: [
		{
		text: 'OK',
		handler: () => 
		{
		//this.navCtrl.push(CreditListPage);
		}
		}
		]
		});
		altsuccess.present();	
		connectSubscription.unsubscribe();
  		}, 3000);
		});

    });

  }
 storageGet(){
	 this.storage.get('Username').then((val) => {
    if(val!='')
	{
	this.nav.setRoot(HomePage);
	}
	else
	{
	this.nav.setRoot(LoginPage);
	}
  });
  	}
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
