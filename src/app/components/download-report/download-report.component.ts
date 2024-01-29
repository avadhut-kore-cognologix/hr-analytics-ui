import { Component } from '@angular/core';
import { DownloadRequest } from '../../models/download-request.model';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css'],
})
export class DownloadReportComponent {
  downloadForm: DownloadRequest = {
    requestId: '',
    corporateEmail: ''
  };
  submitted = false;

  constructor(private downloadService: DownloadService) { }

  downloadReport(): void {
    this.downloadService.downloadReport(this.downloadForm).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
    this.submitted = true;
  }

  getReport(): void {
    this.submitted = false;
    this.downloadForm = {
      requestId: '',
      corporateEmail: ''
    };
  }
}
