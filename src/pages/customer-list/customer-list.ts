import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';
import { WarrantyMasterPage } from '../warranty-master/warranty-master';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {
public Id:any;
public typee:any;
  constructor(public navCtrl: NavController,public app: App,public navParams: NavParams, public http:HttpClient,public alertCtrl: AlertController, public storage: Storage) {
  this.Id = this.navParams.get('RegMasId');
  this.CustomerList();
  }
CustomerList()
{
	this.storage.get('user_id').then((val) => {
	if(val!='')
	{
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/SalesAppAPI/list_customer.php?cid='+this.Id);
	data.subscribe(result=>{
		this.typee = result;
	if(this.typee=='')
	{
	this.typee=false;
	}
	}, error => {
	//alert(JSON.stringify(error));
	});
	
	}
	});
}
ViewClick(CusCode)
{
this.navCtrl.push(WarrantyMasterPage,{CusCode : CusCode});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }
getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.typee = this.typee.filter((item) => {
        return item.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.state.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.city.toLowerCase().indexOf(val.toLowerCase()) > -1;
		//return item.region_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
	else
	{
	this.CustomerList();
	}
  }
}
