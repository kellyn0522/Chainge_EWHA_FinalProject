// mocking.js 
import { validatePerson } from './validatePerson.js'; 
import { validateBankDetails } from './validateBankDetails.js'; 

try {
  const personData = {
    name: 'John Doe',
    phoneNumber: '010-1234-5678',
    identityNumber: '900101-1234567',
    zipCode: '12345',
    homeAddress: '123 Main St',
    email: 'john.doe@example.com',
  };

  const testBankDetails = {
    bankName: 'Kookmin Bank',
    ownerName: 'John Doe',
    account: '123456789012'
  }

  const validatedPerson = validatePerson(personData);
  console.log('Validated Person:', validatedPerson);

  const validatedBankDetail = validateBankDetails(testBankDetails);
  console.log('Validated BankDetails:', validatedBankDetail);

} catch (error) {
  console.error('Validation error:', error.message);
}
