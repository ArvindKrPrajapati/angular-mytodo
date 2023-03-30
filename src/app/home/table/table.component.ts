import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Input() currentPage: number = 1;
  @Input() dataLoading: boolean = true;
  detailModalRef: any;
  selectedTask: any;
  isEdit: boolean = false;
  isLoading: boolean = false;
  saving: boolean = false;
  task: string = '';
  imageEvent: any;
  imageURL: string = '';
  uploadingProgress: any;
  addModalRef: any;
  date: any = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _api: ApiService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openDetailsModal(content: any, selected: any) {
    this.closeAddModal();
    this.selectedTask = selected;
    this.detailModalRef = this.modalService.open(content, {
      size: 'xl',
      scrollable: true,
    });
  }
  openAddModal(content: any) {
    this.closeDetailsModal();
    this.addModalRef = this.modalService.open(content);
  }

  closeDetailsModal() {
    this.detailModalRef?.close();
  }

  closeAddModal() {
    this.task = '';
    this.imageEvent = '';
    this.imageURL = '';
    this.date = '';
    this.isEdit = false;
    this.selectedTask = '';
    this.addModalRef?.close();
  }

  formatDate(d: Date) {
    const dateTime = new Date(d);
    return dateTime.toLocaleString();
  }

  deleteTask() {
    this.isLoading = true;
    this._api.deleteTask(this.selectedTask._id).subscribe((res: any) => {
      this.isLoading = false;
      this.data = this.data.filter(
        (item: any) => item._id != this.selectedTask._id
      );
      this.closeDetailsModal();
    });
  }
  editTask(content: any) {
    this.openAddModal(content);
    this.isEdit = true;
    this.task = this.selectedTask.task;
    this.imageURL = this.selectedTask?.image;
    this.date = new Date(this.selectedTask.date).toISOString().substring(0, 16);
  }
  markTask() {
    this.isLoading = true;
    this._api
      .changeDoneStatus({
        todoid: this.selectedTask._id,
        done: !this.selectedTask.done,
      })
      .subscribe((res: any) => {
        this.isLoading = false;
        this.data = this.data.filter(
          (obj: any) => obj._id != this.selectedTask._id
        );
        this.closeDetailsModal();
      });
  }

  handleFile(event: any): void {
    this.imageEvent = event;
    const file = event?.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  removeImage(): void {
    this.imageEvent = '';
    this.imageURL = '';
  }

  handleSubmit(): void {
    if (this.date && (this.task || this.imageEvent)) {
      this.saving = true;
      if (this.imageEvent) {
        let file = this.imageEvent.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'equals');
        fd.append('cloud_name', 'shivraj-technology');
        this._api.uploadToCloudinary(fd).subscribe((event: any) => {
          if (event.body) {
            this.saveToDb(this.task, event.body.url);
          }

          if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round((100 * event.loaded) / event.total);
            this.uploadingProgress = 'Uploading ' + progress + ' %';
          }
        });
      } else {
        this.saveToDb(this.task, '');
      }
    } else {
      // handle empty form
    }
  }
  handleEdit(): void {
    if (this.date && (this.task || this.imageEvent || this.imageURL)) {
      this.saving = true;
      if (this.imageEvent) {
        let file = this.imageEvent.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'equals');
        fd.append('cloud_name', 'shivraj-technology');
        this._api.uploadToCloudinary(fd).subscribe((event: any) => {
          if (event.body) {
            this.editInDb(this.task, event.body.url);
          }

          if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round((100 * event.loaded) / event.total);
            this.uploadingProgress = 'Uploading ' + progress + ' %';
          }
        });
      } else {
        this.editInDb(this.task, this.imageURL);
      }
    } else {
      // handle empty form
    }
  }

  saveToDb(task: string, image: string) {
    this.uploadingProgress = 'saving....';
    this._api
      .addTask({ task, image, date: this.date })
      .subscribe((res: any) => {
        if (res.success) {
          this.saving = false;
          this.uploadingProgress = '';
          this.closeAddModal();
          this.data = [res.data, ...this.data];
          // alert('added task');
        }
      });
  }
  editInDb(task: string, image: string) {
    this.uploadingProgress = 'saving....';
    this._api
      .editTask({ task, image, id: this.selectedTask._id, date: this.date })
      .subscribe((res: any) => {
        if (res.success) {
          this.saving = false;
          this.uploadingProgress = '';
          this.data = this.data.map((item: any) => {
            if (item._id == this.selectedTask._id) {
              return res.data;
            }
            return item;
          });
          this.closeAddModal();
          // alert('added task');
        }
      });
  }
}
