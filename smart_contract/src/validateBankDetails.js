// BackDetails Info 유효성 검사 
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import Joi from 'joi';

const MONGOURL = 'mongodb+srv://Chat:1234@cluster0.vcpbx.mongodb.net/Chat?retryWrites=true&w=majority';
console.log('MongoDB URL:', MONGOURL);

const client = new MongoClient(MONGOURL);

const bankDetailsSchema = Joi.object({
    bankName: Joi.string().min(2).required().messages({
      'string.empty': 'Bank name cannot be empty',
      'string.min': 'Bank name must be at least 2 characters long',
      'any.required': 'Bank name is required'
    }),
    ownerName: Joi.string().min(2).required().messages({
      'string.empty': 'Owner name cannot be empty',
      'string.min': 'Owner name must be at least 2 characters long',
      'any.required': 'Owner name is required'
    }),
    account: Joi.string().pattern(/^[0-9]{10,20}$/).required().messages({
      'string.empty': 'Account number cannot be empty',
      'string.pattern.base': 'Account number must be between 10 to 20 digits',
      'any.required': 'Account number is required'
    }),
  });
  
  function validateBankDetails(data) {
    const { error, value } = bankDetailsSchema.validate(data, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      throw new Error(`Invalid input:\n- ${errors.join('\n- ')}`);
    }
    return value;
  }

  export { validateBankDetails };
  
  async function saveBankDetails(bankDetails) {
      try {
          await client.connect();
          console.log('Connected successfully to MongoDB');
  
          const db = client.db('Chat'); 
          const collection = db.collection('User');  /// BankDetails
  
          // 유효성 검사 진행
          const validBankDetails = validateBankDetails(bankDetails);
  
          // 데이터 저장
          const result = await collection.insertOne(validBankDetails);
          console.log('Bank details saved:', result.insertedId);
      } catch (error) {
          console.error('Error:', error.message);
      } finally {
          await client.close();
      }
  }

saveBankDetails();