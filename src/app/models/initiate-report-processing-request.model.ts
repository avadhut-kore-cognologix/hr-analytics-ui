export class InitiateReportProcessingRequest {
  userType?: string;
  corporateEmail?: string;
  startDate?: string;
  endDate?: string;
  gmailAvailabilityMessagesFile?: File;
  zohoLeavesFile?: File;
  zohoProfilesFile?: File;
}