export const CellData = {
    Amount,
    Name,
    CostCenter
};
function Amount(cellData) {
    return (
        <ul>
            {cellData.data.Pname.map((gp) => (
                <li>
                    {gp.taxableAmount} <br />
                </li>
            ))}
        </ul>
    );
}

function Name(cellData) {
    return (
        <ul>
            {cellData.data.Pname.map((gp) => (
                <li>{gp.name}</li>
            ))}
        </ul>
    );
}

function CostCenter(cellData) {
    return (
        <ul>
            {cellData.data.Pname.map((gp) => (
                <li>
                    {gp.costCentersList.map((gp) => (
                        <ul>{gp.name}</ul>
                    ))}
                </li>
            ))}
        </ul>
    );
}
