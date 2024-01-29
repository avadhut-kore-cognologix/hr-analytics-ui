import { Component } from '@angular/core';
import { DownloadRequest } from '../../models/download-request.model';
import { DownloadService } from '../../services/download.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import saveAs from 'file-saver';

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
        var fileName = "combined_report.csv";
        const contentDisposition = res.headers.get('Content-Disposition');
        if (contentDisposition) {
          const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = fileNameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '');
          }
        }

        saveAs(res.body, fileName);

        this.downloaded = true;
      },
      error: (e) => {
        console.error(e);
        alert("Problem while downloading the file.\n" +
          "[" + e.status + "] " + e.statusText);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoadingModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
