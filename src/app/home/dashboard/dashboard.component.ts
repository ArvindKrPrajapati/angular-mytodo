import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;
  loading: boolean = true;
  chartData: any;
  barChartData: any;
  lineChartLabels: any = [];
  user: any;

  constructor(private _api: ApiService) {
    this.user = _api.getLoginUser();
    console.log(this.user);
  }

  ngOnInit(): void {
    this._api.dashboard().subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        const _d = res.data[0];
        this.data = res.data[0];
        this.barChartData = {
          labels: [
            'Total',
            'Done Today',
            'Pending Today',
            'Overall Pending',
            'Overall Done',
          ],
          datasets: [
            {
              label: 'Tasks',
              data: [
                _d.total,
                _d.doneToday,
                _d.pendingToday,
                _d.pending,
                _d.done,
              ],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              lineTension: 0.1,
            },
          ],
        };
        let _pData: any = [];
        let _total: any = [];
        let _dData: any = [];

        let _labels: any = [];
        _d.tasksByDate.map((obj: any) => {
          _labels = [..._labels, obj._id];
          _dData = [..._dData, obj.done];
          _total = [..._total, obj.total];
          _pData = [..._pData, obj.pending];
        });
        // todays done by todays pending

        // overall done by overall pending
        this.chartData = [
          {
            label: 'Total Task',
            data: _total,
            fill: false,
            borderColor: 'rgb(10, 192, 192)',
            lineTension: 0.1,
          },
          {
            label: 'Pending Tasks',
            data: _pData,
            fill: true,
            borderColor: 'rgb(20, 192, 192)',
            lineTension: 0.1,
          },
          {
            label: 'Done Tasks',
            data: _dData,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            lineTension: 0.1,
          },
        ];
        this.lineChartLabels = _labels;
      }
    });
  }
}
