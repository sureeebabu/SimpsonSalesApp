import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';
import { CustomerListPage } from '../customer-list/customer-list';

/**
 * Generated class for the RegionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-region-list',
  templateUrl: 'region-list.html',
})
export class RegionListPage {
public userId:any;
public typee:any;
  constructor(public navCtrl: NavController,public app: App,public navParams: NavParams, public http:HttpClient,public alertCtrl: AlertController, public storage: Storage) {
  		 this.storage.get('user_id').then((val) => {
		if(val!='')
		{
		this.userId = val;
		}
		});
		this.RegionList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegionListPage');
  }
RegionList()
{
	this.storage.get('user_id').then((val) => {
	if(val!='')
	{
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/SalesAppAPI/list_region.php?rid='+val);
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
ViewClick(RegMasId)
{
this.navCtrl.push(CustomerListPage,{RegMasId : RegMasId});
}

 getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.typee = this.typee.filter((item) => {
        //return item.region_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
		return item.region_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
	else
	{
	this.RegionList();
	}
  }
}
