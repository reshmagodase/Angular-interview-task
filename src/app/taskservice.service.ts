import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  private baseUrl = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  addTaskData(data:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/vendorSubmit', data)
  }

  updateTaskData(id: any, data: any): Observable<any> {
    console.log("in service :", id)
    return this.http.put<any>(this.baseUrl + '/vendorSubmit/' + id, data)
  }

  deleteVendorData(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/vendorSubmit/' + id)
  }

  getAllVendorData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/vendorSubmit')
  }

}
