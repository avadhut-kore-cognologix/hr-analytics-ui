import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DownloadRequest } from '../models/download-request.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<DownloadRequest[]> {
    return this.http.get<DownloadRequest[]>(baseUrl);
  }

  get(id: any): Observable<DownloadRequest> {
    return this.http.get<DownloadRequest>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<DownloadRequest[]> {
    return this.http.get<DownloadRequest[]>(`${baseUrl}?title=${title}`);
  }
}
