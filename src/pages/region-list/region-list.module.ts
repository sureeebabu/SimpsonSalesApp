import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegionListPage } from './region-list';

@NgModule({
  declarations: [
    RegionListPage,
  ],
  imports: [
    IonicPageModule.forChild(RegionListPage),
  ],
})
export class RegionListPageModule {}
