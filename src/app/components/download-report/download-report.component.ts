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

  constructor(private downloadService: DownloadService) {}

  downloadReport(): void {
    const data = {
      requestId: this.downloadForm.requestId,
      corporateEmail: this.downloadForm.corporateEmail
    };

    this.downloadService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  getReport(): void {
    this.submitted = false;
    this.downloadForm = {
      requestId: '',
      corporateEmail: ''
    };
  }
}
