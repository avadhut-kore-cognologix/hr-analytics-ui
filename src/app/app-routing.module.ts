import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiateReportProcessingComponent } from './components/initiate-report-processing/initiate-report-processing.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'initiate-report-processing', pathMatch: 'full' },
  { path: 'initiate-report-processing', component: InitiateReportProcessingComponent },
  { path: 'download-report', component: DownloadReportComponent },
  { path: 'download-report/:requestId', component: DownloadReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
