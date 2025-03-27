// Person info 유효성 검사 
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import Joi from 'joi';

const MONGOURL = 'mongodb+srv://Chat:1234@cluster0.vcpbx.mongodb.net/Chat?retryWrites=true&w=majority';
console.log('MongoDB URL:', MONGOURL);
/*
const MONGOURL = process.env.MONGO_URL;
console.log('MongoDB URL:', MONGOURL);
*/
const client = new MongoClient(MONGOURL);

// 주민등록번호 검사 패턴 (단순 예시: 생년월일(YYMMDD)-성별(1자리)-중복체크(6자리))
const identityNumberPattern = /^[0-9]{6}-[1-4][0-9]{6}$/;

// 전화번호 검사 패턴 (단순 예시: 010-XXXX-XXXX)
const phoneNumberPattern = /^010-[0-9]{4}-[0-9]{4}$/;

// 우편번호 검사 패턴 (단순 예시: 5자리 숫자)
const zipCodePattern = /^[0-9]{5}$/;

// 이메일 검사 패턴 (RFC 5322 기반의 간단한 예시)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 입력 데이터 유효성 검사 스키마 정의
const personSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required'
  }),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required().messages({
    'string.pattern.base': 'Phone number must be in the format 010-XXXX-XXXX',
    'any.required': 'Phone number is required'
  }),
  identityNumber: Joi.string().pattern(identityNumberPattern).required().messages({
    'string.pattern.base': 'Identity number must be in the format YYMMDD-XXXXXXX',
    'any.required': 'Identity number is required'
  }),
  zipCode: Joi.string().pattern(zipCodePattern).required().messages({
    'string.pattern.base': 'Zip code must be a 5-digit number',
    'any.required': 'Zip code is required'
  }),
  homeAddress: Joi.string().min(1).required().messages({
    'string.empty': 'Home address cannot be empty',
    'any.required': 'Home address is required'
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    'string.pattern.base': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }) 
});

// 유효성 검사 함수
function validatePerson(data) {
  const { error, value } = personSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new Error(`Invalid input:\n- ${errors.join('\n- ')}`);
  }
  return value;
}

export { validatePerson };

// (변경해야함) MongoDB에서 데이터 검색 및 유효성 검사
async function searchAndValidatePerson() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const db = client.db('Chat');
        const collection = db.collection('users');

        const personData = await collection.findOne({ name: 'User'});

        if(personData) {
            console.log('Person data found:', personData);

            // 유효성 검사 진행
            const validData = validatePerson(personData);
            console.log('Validated data:', validData);
            // 여기서 스마트 컨트랙트 실행 코드로 넘어가야함 
        } else {
            console.log('Person not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

searchAndValidatePerson();
