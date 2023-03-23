import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url: string = 'http://localhost:3000/v1';
  url: string = 'https://mytodo-api.onrender.com/v1';

  upurl: string =
    'https://api.cloudinary.com/v1_1/shivraj-technology/image/upload';

  constructor(private _http: HttpClient) {}

  token() {
    return localStorage.getItem('token');
  }

  login(data: any) {
    return this._http.post(this.url + '/auth/login', data);
  }
  signup(data: any) {
    return this._http.post(this.url + '/auth/signup', data);
  }

  uploadToCloudinary(data: any) {
    return this._http.post(this.upurl, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  addTask(data: any) {
    return this._http.post(this.url + '/todo/add', data, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token() }),
    });
  }
  editTask(data: any) {
    return this._http.patch(this.url + '/todo/edit', data, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token() }),
    });
  }

  getTodaysTask() {
    return this._http.get(this.url + '/todo/todays-task', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token() }),
    });
  }

  changeDoneStatus(data: any) {
    return this._http.patch(this.url + '/todo/change-done-status', data, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token() }),
    });
  }

  deleteTask(id: string) {
    return this._http.delete(this.url + '/todo/delete-todo/' + id, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token() }),
    });
  }
}
