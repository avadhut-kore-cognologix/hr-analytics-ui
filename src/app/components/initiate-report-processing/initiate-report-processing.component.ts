import { Component } from '@angular/core';
import { InitiateReportProcessingRequest } from '../../models/initiate-report-processing-request.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DownloadGmailFileComponent } from '../download-gmail-file/download-gmail-file.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-initiate-report-processing',
  templateUrl: './initiate-report-processing.component.html',
  styleUrls: ['./initiate-report-processing.component.css'],
})
export class InitiateReportProcessingComponent {
  currentFile?: File;
  showDateSelection: boolean = true;
  downloadForm: InitiateReportProcessingRequest = {
    userType: undefined,
    corporateEmail: undefined,
    startDate: undefined,
    endDate: undefined,
    gmailAvailabilityMessagesFile: undefined,
    zohoLeavesFile: undefined,
    zohoProfilesFile: undefined,
    rangeType: 'by_date'
  };
  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  years: string[] = [
    "2022",
    "2023",
    "2024",
    "2025"
  ];

  downloadGmailFileModalDialogRef?: MatDialogRef<DownloadGmailFileComponent>;

  constructor(public dialog: MatDialog, private router: Router, private sharedService: SharedService) { }

  initiateReportProcessing(): void {
    this.sharedService.setDownloadRequest(this.downloadForm);
    this.router.navigate(['/download-report']);
  }

  setDates(): void {
    this.showDateSelection = this.downloadForm.rangeType === 'by_date';

    if (this.showDateSelection) {
      this.downloadForm.startDate = '';
      this.downloadForm.endDate = '';
    }
  }

  reset(): void {
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

  openDownloadGmailFileModal() {
    this.downloadGmailFileModalDialogRef = this.dialog.open(DownloadGmailFileComponent);
  }

  closeDownloadGmailFileModal() {
    this.downloadGmailFileModalDialogRef?.close();
  }
}
