export interface ILibreAuthData {
  Culture: string;
  DeviceId: string;
  GatewayType: string;
  SetDevice: boolean;
  Domain: string;
  UserName: string;
  Password: string;
}

export interface ILibreAuthResult {
  UserToken: string;
  AccountID: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleInitial: string;
  Email: string;
  Country: string;
  Culture: string;
  Timezone: any;
  DateOfBirth: string;
  BackupFileExists: boolean;
  IsHCP: boolean;
  Validated: boolean;
  NeedToAcceptPolicies: boolean;
  CommunicationLanguage: string;
  UILanguage: string;
  SupportedDevices: any;
  Created: string;
  GuardianLastName: string;
  GuardianFirstName: string;
  DomainData: string;
  Consents: {
    realWorldEvidence: number;
  };
}
