import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventorDetailPage } from './inventor-detail';

@NgModule({
  declarations: [
    InventorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InventorDetailPage),
  ],
})
export class InventorDetailPageModule {}
