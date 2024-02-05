export class InitiateReportProcessingRequest {
  userType?: string;
  corporateEmail?: string;
  startDate?: string;
  endDate?: string;
  rangeType?: string;
  month?: string;
  year?: string;
  gmailAvailabilityMessagesFile?: File;
  zohoLeavesFile?: File;
  zohoProfilesFile?: File;
}