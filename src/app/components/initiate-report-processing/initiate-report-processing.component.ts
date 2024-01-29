import { Component } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { InitiateReportProcessingRequest } from '../../models/initiate-report-processing-request.model';

@Component({
  selector: 'app-initiate-report-processing',
  templateUrl: './initiate-report-processing.component.html',
  styleUrls: ['./initiate-report-processing.component.css'],
})
export class InitiateReportProcessingComponent {
  currentFile?: File;
  downloadForm: InitiateReportProcessingRequest = {
    userType: '',
    corporateEmail: '',
    startDate: '',
    endDate: '',
    gmailAvailabilityMessagesFile: undefined,
    zohoLeavesFile: undefined,
    zohoProfilesFile: undefined,
  };
  submitted = false;

  constructor(private downloadService: DownloadService) { }

  initiateReportProcessing(): void {
    this.submitted = true;

    this.downloadService.initiateReportProcessing(this.downloadForm).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  reset(): void {
    this.submitted = false;
    this.downloadForm = {
      userType: '',
      corporateEmail: '',
      startDate: '',
      endDate: '',
      gmailAvailabilityMessagesFile: undefined
    };
  }

  selectGmailAvailabilityMessagesFile(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.downloadForm.gmailAvailabilityMessagesFile = event.target.files[0] as File;
    }
  }

  selectZohoProfilesFile(event: any): void {
    this.downloadForm.zohoProfilesFile = event.target.files.item(0);
  }

  selectZohoLeavesFile(event: any): void {
    this.downloadForm.zohoLeavesFile = event.target.files.item(0);
  }
}
