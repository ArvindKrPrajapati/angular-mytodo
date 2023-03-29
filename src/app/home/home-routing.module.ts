import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { PreviousDoneComponent } from './previous-done/previous-done.component';
import { PreviousPendingComponent } from './previous-pending/previous-pending.component';
import { TodaysTaskComponent } from './todays-task/todays-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'todays-task',
        component: TodaysTaskComponent,
      },
      {
        path: 'overall-pending',
        component: PreviousPendingComponent,
      },
      {
        path: 'overall-done',
        component: PreviousDoneComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
