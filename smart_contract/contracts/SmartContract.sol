// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.0;

contract SmartContract {

    struct Person {
        string name;           // 이름 - ID
        string phoneNumber;    // 전화번호 
        string identityNumber; // 주민등록번호 
        address addr;          // 이더리움 주소 
    }

    struct BankDetails {
        string ownerName;   // 소유주명
        string bankName;    // 은행명
        string account;     // 계좌번호
    }

    struct RentalDetails {
        string houseID;         // 매물 ID 
        uint deposit;           // 보증금
        uint cost;              // 월세
        uint startDate;         // 계약 시작 날짜, Unix 타임스탬프 
        uint period;            // 기간 
        uint endDate;           // 계약 종료 날짜, 자동 계산 
        ContractStatus status;  // 계약 상태    
    }

    // 전자서명 데이터를 저장할 구조체
    struct Signature {
        address signer;
        bytes32 messageHash;
        bytes signature;
    }

    // 계약 상태 열거형 정의 -> 상태 관리 
    // Pending : 계약 대기 상태, Active : 계약이 체결되고 진행 중인 상태, Terminated : 계약이 종료된 상태 
    enum ContractStatus { Pending, Active, Terminated }
    
    Person public lessor;                   // 임대인
    Person public tenant;                   // 임차인
    BankDetails public lessorBankDetails;   // 임대인 은행 정보 
    BankDetails public tenantBankDetails;   // 임차인 은행 정보
    RentalDetails public rentalDetails;     // 렌탈 정보
    Signature public contractSignature;     // 전자 서명 

    bool public terminationRequestedByTenant;
    bool public depositPaid;
    bool public isFinalized; 

    // 이벤트 선언 : 중요한 데이터가 변경될 때 이를 기록하기 위해 사용 
    event PersonInfo(
        string name, string phoneNumber
    );

    event BankInfo(
        string bankName, string account, string personType
    );

    event RentalInfo(
        string houseID, uint deposit, uint cost, uint startDate, uint period, uint endDate
    );

    // 보증금이 성공적으로 지불되었음을 기록하는 이벤트 
    event DepositPaid(
        address tenant, uint amount, uint paymentDate 
    );

    // 월세 납부 기록 이벤트
    event RentPaid(
        address indexed tenant, uint amount, uint paymentDate, bool isLate
    );

    event ContractFinalized(address by);
    event ContractTerminated(address by);

    // 누가 계약 종료 요청을 하였는지 기록
    event TerminationRequestedByTenant(address indexed tenant);

    // 은행 계좌 연동 여부를 관리 
    mapping(address => bool) public isBankAccountLinked;

    // 생성자 : 임대인, 임차인, 매물 정보, 렌탈 정보, 집 세부 사항 등에 대해서 전부 초기화 
    constructor(
        Person memory _lessor,
        Person memory _tenant,
        BankDetails memory _lessorBankDetails,
        BankDetails memory _tenantBankDetails,
        RentalDetails memory _rentalDetails,
        Signature memory _signature
    ) {
        lessor = _lessor;
        tenant = _tenant;
/*
        rentalDetails = RentalDetails({
            houseID : "gaeun",
            deposit : 1 ether,
            cost : 0.1 ether,
            startDate : block.timestamp,
            period : 365 days,
            endDate : block.timestamp + 365 days,
            status : ContractStatus.Pending
        }); */

        
        lessorBankDetails = _lessorBankDetails;
        tenantBankDetails = _tenantBankDetails; 

        rentalDetails = _rentalDetails;
        // rentalDetails.endDate = _rentalDetails.startDate + (_rentalDetails.period * 1 days);

        contractSignature = _signature;

        // isBankAccountLinked[lessor.addr] = true;
        // isBankAccountLinked[tenant.addr] = true;
    }

    function activateContract() public {
        require(rentalDetails.status == ContractStatus.Pending, "Contract is already active or terminated.");
        rentalDetails.status = ContractStatus.Active;
    }

    // 테스트용 함수: 최신 시간으로 계약서 작성 날짜 설정
    function setContractSignedDate(uint _contractSignedDate) public onlyLessor {
        contractSignedDate = _contractSignedDate;
    }

    // 테스트용 함수: 계약 종료 날짜 설정
    function setEndDate(uint _endDate) public onlyLessor {
        rentalDetails.endDate = _endDate;
    }

    // 테스트용 함수: 계약 종료 날짜 설정
    function setEndDate2(uint newEndDate) public onlyLessor {
        rentalDetails.endDate = newEndDate;
    }

    // ContractStatus 상태 반환 함수 추가
    function getStatus() public view returns (ContractStatus) {
        return rentalDetails.status;
    }




    // 접근 제어
    modifier onlyLessor() {
        require(lessor.addr != address(0), "Lessor is not set.");
        require(msg.sender == lessor.addr, "Only the lessor can perform this action.");
        _;
    }

    modifier onlyTenant() {
        require(tenant.addr != address(0), "tenant is not set.");
        require(msg.sender == tenant.addr, "Only the tenant can perform this action.");
        _;
    }

    // 은행 계좌 연동 여부를 확인하는 모디파이어 : 연동된 계좌만 특정 함수를 호출할 수 있도록 제한 
    modifier bothAccountLinked() {
        require(isBankAccountLinked[lessor.addr], "Lessor's bank account is not linked.");
        require(isBankAccountLinked[tenant.addr], "Tenant's bank account is not linked.");
        _;
    }

    uint256 public contractSignedDate;   // 계약서 작성 날짜
    uint256 public depositPaymentDate;  // 보증금 송금 날짜 

    // 생성된 전자서명 검증 함수
    function verifysignature(bytes32 messageHash, bytes memory signature) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // 서명 데이터를 분해
        require(signature.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // 복구된 서명자 주소 반환
        return ecrecover(messageHash, v, r, s);
    }

    // 서명 확인 후 동작하는 함수 -> 검증한 후 계약을 서명하는 함수 
    function signContract(bytes32 messageHash, bytes memory signature) public onlyTenant {
        address signer = verifysignature(messageHash, signature);
        require(signer == msg.sender, "Invalid signer");

        // 계약 상태가 대기 중인 경우에만 활성화 
        require(rentalDetails.status == ContractStatus.Pending, "Contract is already active or terminated.");

        // 계약 상태를 활성화로 업데이트
        rentalDetails.status = ContractStatus.Active;

        contractSignedDate = block.timestamp;    // 계약서 작성 날짜 기록

        // 이벤트 발생: 임대인과 임차인의 서명 정보 기록
        emit PersonInfo(
            lessor.name, lessor.phoneNumber
        );

        emit BankInfo(
            lessorBankDetails.bankName, lessorBankDetails.account, "lessor"
        );

        emit PersonInfo(
            tenant.name, tenant.phoneNumber
        );

        emit BankInfo(
            tenantBankDetails.bankName, tenantBankDetails.account, "tenant"
        );

        // 추가적으로 필요한 로직이 있으면 여기에 추가
    }

    // 읽기 전용 함수
    // 계약 전체 세부 사항을 조회
    function getContractDetails() public view returns (
        Person memory,
        Person memory,
        RentalDetails memory
    ) {
        return (lessor, tenant, rentalDetails);
    }

    // 임대인의 정보 조회
    function getLessorInfo() public view returns (
        string memory, string memory, string memory, address, BankDetails memory
    ) {
        return (
            lessor.name, lessor.phoneNumber, lessor.identityNumber, lessor.addr, lessorBankDetails 
        );
    }

    // 임차인의 정보 조회
    function getTenantInfo() public view returns (
        string memory, string memory, string memory, address, BankDetails memory
    ) {
        return (
            tenant.name, tenant.phoneNumber, tenant.identityNumber, tenant.addr, tenantBankDetails
        );
    }

    // ---
    // 임차인에 의한 계약 종료 요청 함수 
    // 이 요청은 임대인이 승인해야 실제로 종료됨 
    function requestTermination() public onlyTenant {
        require(rentalDetails.status == ContractStatus.Active, "Contract is not active.");
        require(!terminationRequestedByTenant, "Termination has already been requested.");

        terminationRequestedByTenant = true;

        emit TerminationRequestedByTenant(msg.sender);
    }

    // 계약 종료 + 보증금 반환 함수
    function approveTermination(bool agreementReached) public onlyLessor {
        require(terminationRequestedByTenant, "No termination requested by tenant.");
        require(rentalDetails.status == ContractStatus.Active, "Contract is not active.");
        require(block.timestamp > rentalDetails.endDate, "Contract period has not ended.");
        require(agreementReached || !isRentLate(), "Rent is overdue. Termination cannot be approved.");

        // 계약 상태 업데이트 및 보증금 반환 
        rentalDetails.status = ContractStatus.Terminated;

        // 해지 요청 상태 초기화 
        terminationRequestedByTenant = false;

        // 보증금 반환 조건을 충족하는 경우에만 보증금 반환
        if (!isRentLate() && agreementReached) {
            payable(tenant.addr).transfer(rentalDetails.deposit);

            emit DepositPaid(tenant.addr, rentalDetails.deposit, block.timestamp);
        } 

        // 계약 종료
        emit ContractTerminated(msg.sender);
    }
    // ---

    // 유효한 이더리움 주소인지 확인하는 함수    
    function isValidAddress(address addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return addr != address(0) && size == 0;       // 주소가 address(0)이 아니고, 컨트랙트가 아닌지 확인        
    }

    // 보증금 지불 함수
    // 계약이 활서화 된 후 임차인이 임대인에게 보증금을 송금
    function payDeposit() public payable onlyTenant {
        require(rentalDetails.status == ContractStatus.Active, "Contract is not active.");
        require(!depositPaid, "Deposit has already been paid.");                            // 보증금이 지불되었는지 확인
        require(msg.value == rentalDetails.deposit, "Incorrect deposit amount.");           // 보증금 금액 확인

        // 보안 개선점 : 임대인의 이더리움 주소가 유효한지 확인
        require(isValidAddress(lessor.addr), "Invalid lessor address.");

        // 계약서 작성 후 5일 이내에 보증금을 지불하는지 확인
        require(block.timestamp <= contractSignedDate + 5 days, "Deposit payment deadline has passed.");

        // 임대인에게 보증금 송금 
        payable(lessor.addr).transfer(msg.value);

        depositPaid = true;                     // 보증금이 지불되었음을 기록
        depositPaymentDate = block.timestamp;   // 보증금 지불 날짜 기록

        emit DepositPaid(
            tenant.addr, msg.value, block.timestamp
        );
    }

    // 월세 지불 함수 -> 일정 기간마다 월세를 지불하는 로직을 처리 + 지불할 때마다 계약 상태에 따라 기록이 될 수 있음 
    function payRent() public payable onlyTenant {
        require(rentalDetails.status == ContractStatus.Active, "Contract is not active.");
        require(msg.value == rentalDetails.cost, "Incorrect rent amount.");
        require(isValidAddress(lessor.addr), "Invalid lessor address.");

        // 1달(30일) 간격으로 지불할 수 있도록 설정
        uint256 monthsElapsed = (block.timestamp - rentalDetails.startDate) / 30 days;
        uint256 paymentDueDate = rentalDetails.startDate + monthsElapsed * 30 days;

        // 현재 날짜가 이번 달의 납부 기한 이상인지 확인
        require(block.timestamp >= paymentDueDate, "Not due yet for this month.");

        // 연체 여부 확인 : 납부 기한으로부터 5일 초과 시 연체로 간주
        bool latePayment = block.timestamp > paymentDueDate + 6 days;

        // 임대인에게 월세 송금
        payable(lessor.addr).transfer(msg.value);

        emit RentPaid(
            tenant.addr, msg.value, block.timestamp, latePayment
        );
    }

    // 월세 연체 확인 함수
    function isRentLate() public view returns (bool) {
        uint256 monthsElapsed = (block.timestamp - rentalDetails.startDate) / 30 days;
        uint256 nextPaymentDue = rentalDetails.startDate + monthsElapsed * 30 days;

        // 납부 기한으로부터 5일 초과 여부 확인
        return block.timestamp > nextPaymentDue + 6 days; 
    }

    // 계약 갱신 함수 
    function renewContract(uint _newStartDate, uint _newPeriod, uint _newRent) public onlyLessor {
        require(rentalDetails.status == ContractStatus.Active || rentalDetails.status == ContractStatus.Terminated, "Contract must be active or terminated to renew.");
        rentalDetails.startDate = _newStartDate;
        rentalDetails.period = _newPeriod;
        rentalDetails.endDate = _newStartDate + (_newPeriod * 1 days);
        rentalDetails.cost = _newRent;
        rentalDetails.status = ContractStatus.Active;
    }

    // 컨트랙트 파기 -> 비활성화 방식으로 변경 
    function finalizeContract() public onlyLessor {
        require(rentalDetails.status == ContractStatus.Terminated, "Contract must be terminated first.");
        require(!isFinalized, "Contract is already finalized.");        // 컨트랙트가 이미 비활성화되었다면 다시 호출하지 않음 

        isFinalized = true;     // 컨트랙트 비활성화  
        
        // 남은 잔액을 임대인에게 전송
        if (address(this).balance > 0) {
            payable(lessor.addr).transfer(address(this).balance);
        }

        // 잔액이 0인지 확인
        require(address(this).balance == 0, "Remaining balance should be zero before finalization.");  

        emit ContractFinalized(msg.sender); 
    }
}
