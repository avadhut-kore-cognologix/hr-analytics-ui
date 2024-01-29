import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { InitiateReportProcessingComponent } from './components/initiate-report-processing/initiate-report-processing.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadReportComponent,
    InitiateReportProcessingComponent,
    LoadingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
