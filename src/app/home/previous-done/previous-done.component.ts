import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-previous-done',
  templateUrl: './previous-done.component.html',
  styleUrls: ['./previous-done.component.css'],
})
export class PreviousDoneComponent implements OnInit {
  data: any = [];
  loading: boolean = true;
  skip: number = 0;
  limit: number = 20;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getCompletedTask(this.skip, this.limit).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.loading = false;
      }
    });
  }
}
