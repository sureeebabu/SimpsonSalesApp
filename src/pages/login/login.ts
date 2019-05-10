import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
/*import { TestPage } from '../test/test';*/
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
public Username:any;
public Password:any;
public Mobile:any;
public user_id:any;
key:string='Username';
data:any = {}; 

  constructor(public navCtrl: NavController,public app: App,public navParams: NavParams, public http:HttpClient, private toastCtrl: ToastController, public storage: Storage) {
  }
 storageGet()
 {
	 this.storage.get(this.key).then((val) => {
		if(val!='')
		{
			let toast = this.toastCtrl.create({
			message: "Already Logined in..!",
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
		
		this.app.getRootNavs()[0].setRoot(HomePage);
		}
	  });

  	} 
login()
{
 var link = 'http://simpsonwms.arkaautomaations.com/SalesAppAPI/LoginApi.php?LGP=1';
 var myData = JSON.stringify({Mobile: this.Mobile,Password: this.Password});
 this.http.post(link, myData)
 .subscribe(data => {
if(data!='')
{
if(data[0].record_status!='0')
{
	let toast = this.toastCtrl.create({
	message: "Login Successful",
	duration: 3000,
	position: 'bottom'
});
toast.present();
	this.storage.set('Username',data[0].sales_person_name);
	this.storage.set('mobile',this.Mobile);
	this.storage.set('user_id',data[0].sales_person_master_id);
	this.storage.set('password',data[0].password);
 this.storage.get(this.key).then((val) => {
    if(val!='')
	{
	this.app.getRootNavs()[0].setRoot(HomePage);
	}
  });

 this.app.getRootNavs()[0].setRoot(HomePage);
  }
 else
 {
 	let toast = this.toastCtrl.create({
	message: "Account In-Active",
	duration: 3000,
	position: 'top'
	
});
toast.present();
 }
}
else
{
	let toast = this.toastCtrl.create({
	message: "Username / Password incorrect",
	duration: 3000,
	position: 'top'
	
});
toast.present();
this.navCtrl.setRoot(LoginPage);
}
 
 
 }, error => {
 //alert(JSON.stringify(error));
 });
}

  ionViewDidLoad() {
  this.storageGet();
    console.log('ionViewDidLoad LoginPage');
  }
}
