const { exec } = require("child_process");

exports.deployContract = (req, res) => {
    const { contractID } = req.body;

    console.log("2222222222222222222", contractID);
    if (!contractID) {
        return res.status(400).json({ error: "Contract ID is required." });
    }

    // 환경 변수로 contractID 설정
    const deployCommand = `CONTRACT_ID=${contractID} truffle migrate --reset`;

    // 스마트 컨트랙트 배포 명령 실행
    exec(deployCommand, { cwd: "./smart_contract" }, (error, stdout, stderr) => {
        if (error) {
            console.error("Error deploying contract:", error);
            return res.status(500).json({ error: "Deployment failed." });
        }
        console.log("Deployment output:", stdout);
        res.status(200).json({ message: "Contract deployed successfully.", details: stdout });
    });
};
