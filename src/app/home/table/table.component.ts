import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() data: any;
  @Input() pending: any;
  @Input() skip: number = 0;
  modalRef: any;
  selectedTask: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _api: ApiService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any, selected: any) {
    this.selectedTask = selected;
    this.modalRef = this.modalService.open(content, {
      size: 'xl',
      scrollable: true,
    });
  }

  close() {
    this.modalRef.close();
  }

  formatDate(d: Date) {
    const dateTime = new Date(d);
    return dateTime.toLocaleString();
  }
}
