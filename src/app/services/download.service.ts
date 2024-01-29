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

    const req = new HttpRequest('GET', `${baseUrl}/${endpoint}`, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  initiateReportProcessing(request: InitiateReportProcessingRequest): Observable<any> {

    var date = new Date();
    if (!request.startDate) {
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      request.startDate = firstDay.toISOString().slice(0, 10);
    }

    if (!request.endDate) {
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      request.endDate = lastDay.toISOString().slice(0, 10);
    }

    var endpoint: string = 'report-generation/?';
    if (request.userType) {
      endpoint += `user_type=${request.userType}&`;
    }

    if (request.corporateEmail) {
      endpoint += `corporate_email=${request.corporateEmail}&`;
    }

    if (request.startDate) {
      endpoint += `start_date=${request.startDate}&`;
    }

    if (request.endDate) {
      endpoint += `end_date=${request.endDate}&`;
    }

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
