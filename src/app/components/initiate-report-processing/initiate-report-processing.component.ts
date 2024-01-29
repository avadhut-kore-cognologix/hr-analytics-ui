import { Component } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { InitiateReportProcessingRequest } from '../../models/initiate-report-processing-request.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { Router } from '@angular/router';

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
  dialogRef?: MatDialogRef<LoadingModalComponent>;

  constructor(private downloadService: DownloadService, public dialog: MatDialog, private router: Router) { }

  initiateReportProcessing(): void {
    this.openDialog();
    this.downloadService.initiateReportProcessing(this.downloadForm).subscribe({
      next: (res) => {
        if (res?.body?.requestId) {
          this.router.navigate(['/download-report', res.body.requestId]);
          this.closeDialog();
        }
      },
      error: (e) => {
        console.error(e);
        this.closeDialog();
      }
    });
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(LoadingModalComponent, dialogConfig);
  }

  closeDialog() {
    this.dialogRef?.close();
  }
}
