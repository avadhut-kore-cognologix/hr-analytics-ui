import { Component } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { InitiateReportProcessingRequest } from '../../models/initiate-report-processing-request.model';

@Component({
  selector: 'app-initiate-report-processing',
  templateUrl: './initiate-report-processing.component.html',
  styleUrls: ['./initiate-report-processing.component.css'],
})
export class InitiateReportProcessingComponent {
  downloadForm: InitiateReportProcessingRequest = {
    userType: '',
    corporateEmail: '',
    startDate: '',
    endDate: ''
  };
  submitted = false;

  constructor(private downloadService: DownloadService) {}

  initiateReportProcessing(): void {
    const data = {
      userType: this.downloadForm.userType,
      corporateEmail: this.downloadForm.corporateEmail,
      startDate: this.downloadForm.startDate,
      endDate: this.downloadForm.endDate
    };

    console.log(data);
    this.submitted = true;

    // this.downloadService.create(data).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.submitted = true;
    //   },
    //   error: (e) => console.error(e)
    // });
  }

  reset(): void {
    this.submitted = false;
    this.downloadForm = {
      userType: '',
      corporateEmail: '',
      startDate: '',
      endDate: ''
    };
  }
  
}
