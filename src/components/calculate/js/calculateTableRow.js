import React from "react";
import {
    dateParseToSimple2,
    moneyComma,
    provideStatusToValue,
    provideTypeToValue
} from '../../../common/calculate/function'

export default function CalculateTableRow(row) {
    return (
        <tr>
            <th> {dateParseToSimple2(row)}</th>
            <td>{provideTypeToValue(row.obj.type)}</td>
            <td>{row.obj.supportRate}</td>
            <td>{provideStatusToValue(row.obj.provideStatus)}</td>
            <td className="searchResultMoneyRow">{moneyComma(row.obj.finalPaymentCost)}</td>
            <td><button onClick={()=> {
                row.setModalFlag(!row.flag)
                row.setChoiceCalculate(row.calculateId)
                console.log("row inner " + row.calculateId)
                console.log("row inner " + row.flag)
            }} className="calculate-preview-button" > 미리 보기</button></td>
        </tr>
    )
}