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

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.dashboard().subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        this.data = res.data[0];
      }
    });
  }
}
