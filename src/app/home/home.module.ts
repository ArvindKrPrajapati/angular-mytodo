import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodaysTaskComponent } from './todays-task/todays-task.component';
import { PreviousPendingComponent } from './previous-pending/previous-pending.component';
import { PreviousDoneComponent } from './previous-done/previous-done.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../common/components/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    TodaysTaskComponent,
    PreviousPendingComponent,
    PreviousDoneComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    NgChartsModule,
  ],
})
export class HomeModule {}
