import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { CreditTabsPage } from '../credit-tabs/credit-tabs'; 

/**
 * Generated class for the WarrantyMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-warranty-master',
  templateUrl: 'warranty-master.html',
})
export class WarrantyMasterPage {
public typee:any;
public CusCode:any;
public ClaimValue:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public storage: Storage, public alertCtrl: AlertController) {
  this.CusCode = this.navParams.get('CusCode');
  this.GetMasterData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarrantyMasterPage');
  }

GetMasterData()
{

	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/SalesAppAPI/RequestClaim.php?AdminData=Admin&custcode='+this.CusCode);
	data.subscribe(result=>{
	this.typee=result;
	if(this.typee=='')
	{
	this.typee=false;
	}
	}, (error) => {
		//alert(JSON.stringify(error));
	});

}
ViewData(Mid)
{
this.navCtrl.push(CreditTabsPage , {Mid:Mid});
}
 getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.typee = this.typee.filter((item) => {
        return item.invoice_no.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.claim_status.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
	else
	{
	this.GetMasterData();
	}
  }
}
