
import { validateBankDetails } from './validateBankDetails.js'; // 올바른 경로로 수정

try {
    const testBankDetails = {
        bankName: 'Kookmin Bank',
        ownerName: 'John Doe',
        account: '123456789012'
    };

    const validatedBankDetail = validateBankDetails(testBankDetails);
    console.log('Validated BankDetails:', validatedBankDetail);

} catch (error) {
  console.error('Validation error:', error.message);
}
