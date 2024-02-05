import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DownloadRequest } from '../models/download-request.model';
import { InitiateReportProcessingRequest } from '../models/initiate-report-processing-request.model';
import { DownloadGmailFile } from '../models/download-gmail-file.model';

const baseUrl = 'http://hranalytics.cognologix.in:8000/v2/async/hr-analytics';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) { }

  downloadGmailFile(request: DownloadGmailFile): Observable<any> {
    var endpoint: string = 'get-gmail-file/?';
    if (request.username) {
      endpoint += `username=${request.username}&`;
    }

    if (request.password) {
      endpoint += `password=${request.password}&`;
    }

    return this.http.get<Blob>(`${baseUrl}/${endpoint}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

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
    var endpoint: string = 'report-generation/?';
    if (request.userType) {
      endpoint += `user_type=${request.userType}&`;
    }

    if (request.corporateEmail) {
      endpoint += `corporate_email=${request.corporateEmail}&`;
    }

    endpoint += `range_type=${request.rangeType}&`;

    if (request.rangeType === 'by_date') {
      endpoint += `start_date=${request.startDate}&`;
      endpoint += `end_date=${request.endDate}&`;
    }
    else {
      endpoint += `month_type=${request.month}&`;
      endpoint += `year_type=${request.year}&`;
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
