import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-todays-task',
  templateUrl: './todays-task.component.html',
  styleUrls: ['./todays-task.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class TodaysTaskComponent implements OnInit {
  imageEvent: any;
  imageURL: string = '';
  task: string = '';
  saving: boolean = false;
  uploadingProgress: any;
  modalRef: any;
  isLoading: boolean = true;
  data: any[] = [];
  selectedTask: any;
  isEdit: boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _api: ApiService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this._api.getTodaysTask().subscribe((res: any) => {
      if (res.success) {
        this.isLoading = false;
        this.data = res.data;
        console.log(this.data);
      }
    });
  }

  public get doneTasksLength(): number {
    return this.data.filter((task) => task.done === true).length;
  }

  public get pendingTasksLength(): number {
    return this.data.filter((task) => task.done === false).length;
  }

  open(content: any) {
    this.isEdit = false;
    this.modalRef = this.modalService.open(content, { centered: false });
  }

  close() {
    this.task = '';
    this.imageEvent = '';
    this.imageURL = '';
    this.modalRef.close();
  }

  handleSubmit(): void {
    if (this.task || this.imageEvent) {
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
    if (this.task || this.imageEvent || this.imageURL) {
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
    this._api.addTask({ task, image }).subscribe((res: any) => {
      if (res.success) {
        this.saving = false;
        this.uploadingProgress = '';
        this.close();
        this.data = [res.data, ...this.data];
        // alert('added task');
      }
    });
  }
  editInDb(task: string, image: string) {
    this.uploadingProgress = 'saving....';
    this._api
      .editTask({ task, image, id: this.selectedTask._id })
      .subscribe((res: any) => {
        if (res.success) {
          this.saving = false;
          this.uploadingProgress = '';
          this.close();
          this.data = this.data.map((item: any) => {
            if (item._id == this.selectedTask._id) {
              return res.data;
            }
            return item;
          });
          // alert('added task');
        }
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
  openMenu(content: any, item: any) {
    this.selectedTask = item;
    this.open(content);
  }

  deleteTask() {
    this.close();
    this.isLoading = true;
    this._api.deleteTask(this.selectedTask._id).subscribe((res: any) => {
      this.isLoading = false;
      this.data = this.data.filter(
        (item: any) => item._id != this.selectedTask._id
      );
    });
  }

  markTask() {
    this.close();
    this.isLoading = true;
    this._api
      .changeDoneStatus({
        todoid: this.selectedTask._id,
        done: !this.selectedTask.done,
      })
      .subscribe((res: any) => {
        this.isLoading = false;
        this.data = this.data.map((item: any) => {
          if (item._id == this.selectedTask._id) {
            return { ...item, done: !this.selectedTask.done };
          }
          return item;
        });
      });
  }

  editTask(content: any) {
    this.close();
    this.open(content);
    this.isEdit = true;
    this.task = this.selectedTask.task;
    this.imageURL = this.selectedTask?.image;
  }
}
