
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  designation: string;
  companyName: string;
  profEmail: string;
  address: string;
  password: string;
}

export interface DriverDetails {
  firstName: string,
  middleName: string,
  lastName: string,
  dateOfBirth: string,
  avatar: string;
  email: string,
  mobile: string,
  currentAddress: {
      houseNumber: number,
      street: string,
      suburb: string,
      state: string,
      country: string,
      pincode: string,
  }
  permanentAddress: {
      houseNumber: number,
      street: string,
      suburb: string,
      state: string,
      country: string,
      pincode: string,
  }
  emergencyContactInformation: {
      contactName: string,
      contactNumber: string,
      relationship: string
  }
  employmentHistory: [{
      previousEmployer: string,
      yearsOfExperience: string,
      reasonOfLeaving: string,
      companyName: string,
      referenceContactName: string,
      referenceEmailId: string,
      referenceContactNumber: string
  }]
  licenseDetails: {
      licenseNumber: string,
      licenseCardNumber: string,
      licenseType: string,
      state: string,
      dateOfIssue: string,
      expiryDate: string,
      daysLeftForRenewal: string,
      documents: []
  }
  specialDrivingLicense: string,

  visaStatus: {
      type: string,
      uploadDate: Date
  },
  driverLicenseFront: {
      type: string,
      uploadDate: Date
  },
  driverLicenseBack: {
      type: string,
      uploadDate: Date
  },
  licenseHistory: {
      type: string,
      uploadDate: Date
  },
  policeVerification: {
      type: string,
      uploadDate: Date
  },
  passportFront: {
      type: string,
      uploadDate: Date
  },
  passportBack: {
      type: string,
      uploadDate: Date
  },
  healthInsurance: {
      type: string,
      uploadDate: Date
  },
  driverCertificate: {
      type: string,
      uploadDate: Date
  },
  fitness: {
      type: string,
      uploadDate: Date
  },
  drugTest: {
      type: string,
      uploadDate: Date
  },
}