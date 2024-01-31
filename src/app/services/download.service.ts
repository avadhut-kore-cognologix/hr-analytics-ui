import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DownloadRequest } from '../models/download-request.model';
import { InitiateReportProcessingRequest } from '../models/initiate-report-processing-request.model';

const baseUrl = 'http://hranalytics.cognologix.in:8000/v1/async/hr-analytics';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) { }

  downloadReport(request: DownloadRequest): Observable<any> {
    var endpoint: string = 'get-report/?';
    if (request.requestId) {
      endpoint += `request_id=${request.requestId}&`;
    }

    if (request.corporateEmail) {
      endpoint += `corporate_email=${request.corporateEmail}&`;
    }

    return this.http.get<Blob>(`${baseUrl}/${endpoint}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  initiateReportProcessing(request: InitiateReportProcessingRequest): Observable<any> {
    var startDate = '', endDate = '';
    var endpoint: string = 'report-generation/?';
    if (request.userType) {
      endpoint += `user_type=${request.userType}&`;
    }

    if (request.corporateEmail) {
      endpoint += `corporate_email=${request.corporateEmail}&`;
    }

    var date = new Date();

    if (request.period) {
      switch (request.period) {
        case "1":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
          startDate = sDate.toISOString().slice(0, 10);
          endDate = date.toISOString().slice(0, 10);
          break;

        case "3":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
          startDate = sDate.toISOString().slice(0, 10);
          endDate = date.toISOString().slice(0, 10);
          break;

        case "6":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
          startDate = sDate.toISOString().slice(0, 10);
          endDate = date.toISOString().slice(0, 10);
          break;
      }
    }
    else {
      startDate = request.startDate ?? new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
      endDate = request.endDate ?? new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);
    }

    endpoint += `start_date=${startDate}&`;
    endpoint += `end_date=${endDate}&`;

    const formData: FormData = new FormData();
    if (request.gmailAvailabilityMessagesFile)
      formData.append("gmail_availability_json", request.gmailAvailabilityMessagesFile);

    if (request.zohoLeavesFile)
      formData.append("zoho_leave_csv", request.zohoLeavesFile);

    if (request.zohoProfilesFile)
      formData.append("zoho_employee_profile_csv", request.zohoProfilesFile);

    const req = new HttpRequest('POST', `${baseUrl}/${endpoint}`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
