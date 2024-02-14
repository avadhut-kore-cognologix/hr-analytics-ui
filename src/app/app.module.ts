import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { InitiateReportProcessingComponent } from './components/initiate-report-processing/initiate-report-processing.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { DownloadGmailFileComponent } from './components/download-gmail-file/download-gmail-file.component';
import { UnknownErrorPageComponent } from './components/unknown-error-page/unknown-error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadReportComponent,
    InitiateReportProcessingComponent,
    LoadingModalComponent,
    DownloadGmailFileComponent,
    UnknownErrorPageComponent
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
