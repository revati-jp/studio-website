export interface LicenseInfo {
  licenses: string;
  repository: string;
  licenseText: string;
  copyright: string;
  [key: string]: unknown;
}

export interface SoftwareLicense {
  id: string;
  license: LicenseInfo;
}
