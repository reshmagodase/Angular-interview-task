import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  private baseUrl = "http://localhost:3000/TaskDetails/"
  constructor(private http: HttpClient) { }

  addTaskData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data)
  }

  updateTaskData(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + id, data)
  }

  deleteVendorData(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + id)
  }

  getAllVendorData(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
  }
}
