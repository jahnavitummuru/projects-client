import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './dishes.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/record';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addRecord(record: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, record);
  }

  updateRecord(id: string, record: Project): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Project>(url, record);
  }

  deleteRecord(recordId: string): Observable<any> {
    const url = `${this.apiUrl}/${recordId}`;
    return this.http.delete(url);
  }
}
