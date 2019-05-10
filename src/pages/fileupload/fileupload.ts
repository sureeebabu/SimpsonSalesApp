import { Component} from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FileuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fileupload',
  templateUrl: 'fileupload.html',
})
export class FileuploadPage {
public typee:any;
public id:any;
  constructor(public navCtrl: NavController, public http:HttpClient, public navParams: NavParams, public loadingCtrl: LoadingController, public platform: Platform) {
this.id = this.navParams.get('Uid');
this.GetImageData(this.id);
  }

GetImageData(respon)
{
	let data :Observable<any>;
	data = this.http.get('http://simpsonwms.arkaautomaations.com/WarrantyAppAPI/RequestClaim.php?DataImg='+respon);
	data.subscribe(result=>{
	//alert(result);
	this.typee=result;
	}, (error) => {
		//alert(JSON.stringify(error));
	});
}

}

