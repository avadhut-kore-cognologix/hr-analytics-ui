import { Component, OnInit } from '@angular/core';
import { DownloadGmailFile } from '../../models/download-gmail-file.model';
import { DownloadService } from '../../services/download.service';
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
  
  period?: string;
  startDate?: string;
  endDate?: string;
  month?: string;
  year?: string;
  rangeType?: string = 'by_date';
  showDateSelection: boolean = true;

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

  constructor(private downloadService: DownloadService) { }
  ngOnInit(): void {
  }


  setDates(): void {
    this.showDateSelection = this.rangeType === 'by_date';
    if (this.showDateSelection) {
      this.startDate = '';
      this.endDate = '';
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
      },
      error: (e) => {
        console.error(e);
        alert("Problem while downloading the file.\n" +
          "[" + e.status + "] " + e.statusText);
      }
    });
  }
}
