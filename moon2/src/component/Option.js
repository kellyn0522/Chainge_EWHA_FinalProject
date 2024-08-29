const Option = ({bedSize, hasItems}) => {
    let option = [];

    if(String(hasItems[0]) === String(1)){option.push("세탁기");}
    if(String(hasItems[1]) === String(1)){option.push("드라이기");}
    if(String(hasItems[2]) === String(1)){option.push("TV");}
    if(String(hasItems[3]) === String(1)){option.push("에어컨");}
    if(String(hasItems[4]) === String(1)){option.push("난방");}
    if(String(hasItems[5]) === String(1)){option.push("블라인드");}

    if (bedSize) {
        return (
            <div className = "Option">
                <div className="text">포함 옵션</div>
                <div className="text">침대 : {bedSize}</div>
                <div className= "option_wrapper">
                    {option.map((it,index) => ( <div key={index}>{it}</div> ))}
                </div>
            </div>
        )
    } else {
        <div className = "Option">
            <div className="text">포함 옵션</div>
            <div className= "option_wrapper">
                {option.map((it,index) => ( <div key={index}>{it}</div> ))}
            </div>
        </div>
    }
};
export default Option;