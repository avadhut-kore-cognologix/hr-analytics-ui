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

  constructor(private downloadService: DownloadService, public dialog: MatDialog) { }
  ngOnInit(): void {
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
