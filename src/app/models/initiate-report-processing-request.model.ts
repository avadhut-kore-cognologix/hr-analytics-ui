export class InitiateReportProcessingRequest {
  userType?: string;
  corporateEmail?: string;
  startDate?: string;
  endDate?: string;
  period?:string;
  gmailAvailabilityMessagesFile?: File;
  zohoLeavesFile?: File;
  zohoProfilesFile?: File;
}