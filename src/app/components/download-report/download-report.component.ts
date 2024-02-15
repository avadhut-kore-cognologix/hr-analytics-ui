import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { DownloadRequest } from '../../models/download-request.model';
import { DownloadService } from '../../services/download.service';
import saveAs from 'file-saver';
import { SharedService } from '../../services/shared.service';

export const COPY = 'Copy';
export const COPIED = 'Copied';

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
  downloading = false;
  jsonString: string = '';
  btnCopyTxt = COPY;
  data = {};

  constructor(private downloadService: DownloadService, private clipboard: Clipboard, private sharedService: SharedService) { }
  ngOnInit(): void {

    var request = this.sharedService.getDownloadRequest();

    if (request) {
      this.sharedService.setDownloadRequest(undefined);
      this.downloading = true;
      this.submitted = true;
      this.downloadService.initiateReportProcessing(request).subscribe({
        next: (res) => {
          if (res?.body?.request_id) {
            this.downloadForm.requestId = res.body.request_id;
            this.data = res.body;
            setTimeout(() => {
              console.log("Delayed for 30 second.");
              this.downloading = false;
            }, 30000);
          }
        },
        error: (e) => {
          var errorMessage = '';
          errorMessage = e?.message ?? 'Error Occured';
          alert(errorMessage);
          this.data = e;
          console.error(e);
          this.downloading = false;
        }
      });
    }
  }

  submitDownloadReportRequest(): void {
    this.submitted = true;
  }

  getReport(): void {
    this.downloadService.downloadReport(this.downloadForm).subscribe({
      next: (res) => {
        this.data = res;
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
        this.data = e;
        console.error(e);
        alert("Problem while downloading the file.\n" +
          "[" + e.status + "] " + e.statusText);
      }
    });
  }

  copyToClipboard() {
    this.clipboard.copy(JSON.stringify(this.data));
    this.btnCopyTxt = COPIED;

    setTimeout(() => {
      this.btnCopyTxt = COPY;
    }, 3000);
  }

  reset(): void {
    this.submitted = false;
    this.downloaded = false;
    this.downloading = false;
    this.downloadForm = {
      requestId: '',
      corporateEmail: ''
    };
  }

}
