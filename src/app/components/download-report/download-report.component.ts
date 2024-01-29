import { Component } from '@angular/core';
import { DownloadRequest } from '../../models/download-request.model';
import { DownloadService } from '../../services/download.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';

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
  downloaded = false;

  constructor(private downloadService: DownloadService, public dialog: MatDialog) { }

  submitDownloadReportRequest(): void {
    this.submitted = true;
    this.openDialog();
  }

  getReport(): void {
    this.downloaded = true;
    this.downloadService.downloadReport(this.downloadForm).subscribe({
      next: (res) => {
        console.log(res);
        this.downloaded = true;
      },
      error: (e) => console.error(e)
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoadingModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
