import { Component, OnInit } from '@angular/core';
import { DownloadRequest } from '../../models/download-request.model';
import { DownloadService } from '../../services/download.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import saveAs from 'file-saver';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css'],
})
export class DownloadReportComponent implements OnInit {
  downloadForm: DownloadRequest = {
    requestId: '',
    corporateEmail: ''
  };
  submitted = false;
  downloaded = false;
  dialogRef?: MatDialogRef<LoadingModalComponent>;

  constructor(private downloadService: DownloadService, public dialog: MatDialog, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['requestId']) {
        this.downloadForm.requestId = params['requestId'];
        this.submitted = true;
      }
    });
  }

  submitDownloadReportRequest(): void {
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
    const timeout = 3000;
    const dialogRef = this.dialog.open(LoadingModalComponent);
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
         dialogRef.close();
         this.submitted = true;
      }, timeout)
    })
  }

  reset(): void {
    this.submitted = false;
    this.downloaded = false;
    this.downloadForm = {
      requestId: '',
      corporateEmail: ''
    };
  }
}
