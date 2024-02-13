import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ThingListComponent } from '../components/thing-list/thing-list.component';
import { ThingModalComponent } from '../components/thing-modal/thing-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, ThingListComponent, ThingModalComponent]
})
export class HomePageModule {}
