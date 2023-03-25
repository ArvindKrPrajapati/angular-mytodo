import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-previous-pending',
  templateUrl: './previous-pending.component.html',
  styleUrls: ['./previous-pending.component.css'],
})
export class PreviousPendingComponent implements OnInit {
  data: any = [];
  loading: boolean = true;
  skip: number = 0;
  limit: number = 20;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getPendingTask(this.skip, this.limit).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.loading = false;
      }
    });
  }
}
