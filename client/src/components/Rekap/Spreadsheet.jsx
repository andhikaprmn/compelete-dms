import React from "react";

import {
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
} from "@syncfusion/ej2-react-spreadsheet";

//query-client
import { useQuery } from "react-query";
import { getAllDocuments } from "../../api/Document/DocumentApi";

const Spreadsheet = () => {
  const { data: documents } = useQuery("alldocuments", getAllDocuments);
  return (
    <div className="app">
      <div>
        <h2>Rekapitulasi data</h2>
      </div>
      <SpreadsheetComponent
        height="80vh"
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        allowSave={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
      >
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={documents}></RangeDirective>
            </RangesDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
};

export default Spreadsheet;
