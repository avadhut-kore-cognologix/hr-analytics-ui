import { Injectable } from '@angular/core';
import { InitiateReportProcessingRequest } from '../models/initiate-report-processing-request.model';

@Injectable()
export class SharedService {
    downloadRequest?: InitiateReportProcessingRequest;
    constructor() {
        this.downloadRequest = undefined;
    }
    setDownloadRequest(val?: InitiateReportProcessingRequest) {
        this.downloadRequest = val;
    }
    getDownloadRequest() {
        return this.downloadRequest;
    }
}