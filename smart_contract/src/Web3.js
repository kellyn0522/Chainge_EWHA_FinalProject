// 특정 이벤트 로그 조회
contractInstance.getPastEvents('EventName', {
    fromBlock: startBlock,
    toBlock: 'latest'
}, (error, events) => {
    events.forEach((event) => {
        console.log(event.returnValues);
        web3.eth.getBlock(event.blockNumber).then((block) => {
            console.log("Event timestamp: " + new Date(block.timestamp * 1000)); // 타임스탬프 확인
        });
    });
});
