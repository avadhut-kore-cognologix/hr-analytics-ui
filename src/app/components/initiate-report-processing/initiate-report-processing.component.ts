import { Component } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { InitiateReportProcessingRequest } from '../../models/initiate-report-processing-request.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { Router } from '@angular/router';
import { DownloadGmailFileComponent } from '../download-gmail-file/download-gmail-file.component';

@Component({
  selector: 'app-initiate-report-processing',
  templateUrl: './initiate-report-processing.component.html',
  styleUrls: ['./initiate-report-processing.component.css'],
})
export class InitiateReportProcessingComponent {
  currentFile?: File;
  period?: string;
  downloadForm: InitiateReportProcessingRequest = {
    userType: undefined,
    corporateEmail: undefined,
    startDate: undefined,
    endDate: undefined,
    gmailAvailabilityMessagesFile: undefined,
    zohoLeavesFile: undefined,
    zohoProfilesFile: undefined,
  };
  loadingModalDialogRef?: MatDialogRef<LoadingModalComponent>;
  downloadGmailFileModalDialogRef?: MatDialogRef<DownloadGmailFileComponent>;

  constructor(private downloadService: DownloadService, public dialog: MatDialog, private router: Router) { }

  initiateReportProcessing(): void {
    this.openLoadingModal();
    this.downloadService.initiateReportProcessing(this.downloadForm).subscribe({
      next: (res) => {
        if (res?.body?.requestId) {
          this.router.navigate(['/download-report', res.body.requestId]);
          this.closeLoadingModal();
        }
      },
      error: (e) => {
        console.error(e);
        this.closeLoadingModal();
      }
    });
  }

  setDates(): void {
    var date = new Date();

    if (this.period) {
      switch (this.period) {
        case "0":          
          this.downloadForm.startDate = '';
          this.downloadForm.endDate = '';
          break;

        case "1":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
          this.downloadForm.startDate = sDate.toISOString().slice(0, 10);
          this.downloadForm.endDate = date.toISOString().slice(0, 10);
          break;

        case "3":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
          this.downloadForm.startDate = sDate.toISOString().slice(0, 10);
          this.downloadForm.endDate = date.toISOString().slice(0, 10);
          break;

        case "6":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
          this.downloadForm.startDate = sDate.toISOString().slice(0, 10);
          this.downloadForm.endDate = date.toISOString().slice(0, 10);
          break;

        case "12":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 12, date.getDate());
          this.downloadForm.startDate = sDate.toISOString().slice(0, 10);
          this.downloadForm.endDate = date.toISOString().slice(0, 10);
      }
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

  openLoadingModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.loadingModalDialogRef = this.dialog.open(LoadingModalComponent, dialogConfig);
  }

  closeLoadingModal() {
    this.loadingModalDialogRef?.close();
  }

  openDownloadGmailFileModal() {
    this.downloadGmailFileModalDialogRef = this.dialog.open(DownloadGmailFileComponent);
  }

  closeDownloadGmailFileModal() {
    this.downloadGmailFileModalDialogRef?.close();
  }
}
