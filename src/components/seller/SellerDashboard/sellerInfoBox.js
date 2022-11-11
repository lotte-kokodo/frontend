import React, {useEffect} from 'react'
import "../css/sellerInfoBox.css"
export default function SellerInfoBox(props) {
    return(
        // <Container>
        <div className="seller-info-box-out">
            <div className="seller-info-box-out-2">
                <div className="seller-info-box-text-bold seller-info-box-title-font-size seller-info-box-margin">{props.titleName}</div>
                <div className="seller-info-box-number-text">
                    <div className="seller-info-box-second-box">
                        <div className="seller-number-box-info">
                            <div className="seller-info-box-text-bold seller-info-box-number-font-size">{props.numberInfo}</div>
                            <div className="seller-info-box-text-bold seller-info-box-unit-font-size">{props.unit}</div>
                        </div>
                        {/*{props.updownFlag ? "seller-num-color-red" : "seller-num-color-blue"}*/}
                        <div className={"seller-number-per-info " + (props.updownFlag ? "seller-num-color-red" : "seller-num-color-blue")}> {props.updownFlag ? '^' : 'v'}{props.changeNumberInfo}{props.changNumberPercent} </div>
                    </div>
                </div>
            </div>
        </div>
        // {/*</Container>*/}
    )
}

// const Container = styled`
//     margin: auto;
//     width: 300px;
//     height: 300px;
//     text-align: center;
//     box-shadow: 1px 1px 3px 1px #dadce0;
// `;