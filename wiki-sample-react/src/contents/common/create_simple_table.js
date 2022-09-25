import React from "react";
import ConvertHtml from "lib/convert_html";

const CreateTd = (props) => {
  const _tdList = props.tdList;
  return (<>
    {_tdList.map((val, index) => {
      return (<React.Fragment key={index}>
        {(() => {
          if(index == 0){ //最初のみ「th」
            return (<th>
              <ConvertHtml 
                text={val} 
              />
            </th>)
          }else{
            return (<td>
              <ConvertHtml 
                text={val} 
              />
            </td>)
          }
        })()}
      </React.Fragment>)
    })}
  </>)
};

const CreateSimpleTable = (props) => {
  const _tableData = props.tableData;
  return (<>
    <table className="tableProfListDescription">
      <tbody>
        {_tableData.map((val, index) => {
          if(!val){
            val = [];
          };
          return (<React.Fragment key={index}>
            <tr>
              <CreateTd 
                tdList={val} 
              />
            </tr>
          </React.Fragment>)
        })}
      </tbody>
    </table>
  </>)
};

CreateSimpleTable.defaultProps = {
  tableData:[], 
};

export default CreateSimpleTable;
