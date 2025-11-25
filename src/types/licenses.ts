export interface LicenseInfo {
  licenses: string | null;
  repository: string | null;
  licenseText: string | null;
  copyright: string | null;
  [key: string]: unknown;
}

export interface SoftwareLicense {
  id: string;
  license: LicenseInfo;
}
