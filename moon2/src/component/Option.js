const Option = ({bedSize, hasItems}) => { // 옵션 출력
    let option = [];

    if(String(hasItems[0]) === String(1)){option.push("세탁기");} // 옵션 포함 여부 저장
    if(String(hasItems[1]) === String(1)){option.push("드라이기");}
    if(String(hasItems[2]) === String(1)){option.push("TV");}
    if(String(hasItems[3]) === String(1)){option.push("에어컨");}
    if(String(hasItems[4]) === String(1)){option.push("난방");}
    if(String(hasItems[5]) === String(1)){option.push("블라인드");}

    if (bedSize) { // 침대 포함인 경우
        return (
            <div className = "Option">
                <div className="text">포함 옵션</div>
                <div className="text">침대 : {bedSize}</div>
                <div className= "option_wrapper">
                    {option.map((it,index) => ( <div key={index}>{it}</div> ))}
                </div>
            </div>
        )
    } else { // 침대 불포함인 경우
        <div className = "Option">
            <div className="text">포함 옵션</div>
            <div className= "option_wrapper">
                {option.map((it,index) => ( <div key={index}>{it}</div> ))}
            </div>
        </div>
    }
};
export default Option;