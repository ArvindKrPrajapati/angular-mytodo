import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentPage: number = 1;

  constructor(
    private _api: ApiService,
    private _activatedRoute: ActivatedRoute
  ) {
    _activatedRoute.paramMap.subscribe((p: any) => {
      const _p = p.get('page');
      this.currentPage = _p ? Number(_p) : 1;
      this.skip = this.currentPage * this.limit - this.limit;
      this.fetchData();
    });
  }
  ngOnInit(): void {}
  fetchData() {
    this.loading = true;
    this._api.getCompletedTask(this.skip, this.limit).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.loading = false;
      }
    });
  }
}
