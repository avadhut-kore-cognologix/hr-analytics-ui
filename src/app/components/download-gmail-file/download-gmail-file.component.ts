import { Component, OnInit } from '@angular/core';
import { DownloadGmailFile } from '../../models/download-gmail-file.model';
import { DownloadService } from '../../services/download.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import saveAs from 'file-saver';

@Component({
  selector: 'app-download-gmail-file',
  templateUrl: './download-gmail-file.component.html',
  styleUrls: ['./download-gmail-file.component.css'],
})
export class DownloadGmailFileComponent implements OnInit {
  downloadForm: DownloadGmailFile = {
    username: '',
    password: ''
  };
  dialogRef?: MatDialogRef<LoadingModalComponent>;
  period?: string;
  startDate?: string;
  endDate?: string;

  constructor(private downloadService: DownloadService, public dialog: MatDialog) { }
  ngOnInit(): void {
  }


  setDates(): void {
    var date = new Date();

    if (this.period) {
      switch (this.period) {
        case "0":
          this.startDate = '';
          this.endDate = '';
          break;

        case "1":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
          this.startDate = sDate.toISOString().slice(0, 10);
          this.endDate = date.toISOString().slice(0, 10);
          break;

        case "3":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
          this.startDate = sDate.toISOString().slice(0, 10);
          this.endDate = date.toISOString().slice(0, 10);
          break;

        case "6":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
          this.startDate = sDate.toISOString().slice(0, 10);
          this.endDate = date.toISOString().slice(0, 10);
          break;

        case "12":
          var sDate = new Date(date.getFullYear(), date.getMonth() - 12, date.getDate());
          this.startDate = sDate.toISOString().slice(0, 10);
          this.endDate = date.toISOString().slice(0, 10);
      }
    }
  }

  submitDownloadGmailFileRequest(): void {
    this.downloadService.downloadGmailFile(this.downloadForm).subscribe({
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

        this.closeDialog();
      },
      error: (e) => {
        console.error(e);
        alert("Problem while downloading the file.\n" +
          "[" + e.status + "] " + e.statusText);
        this.closeDialog();
      }
    });
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
