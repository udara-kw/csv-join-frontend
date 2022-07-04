import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Download } from "@mui/icons-material";
import MDBox from "../../components/MDBox";
import { getCSVData } from "../../services";

export default function CSVFileDownload() {
  const [csvColumns, setCsvColumns] = useState([]);
  const [csvRows, setCsvRows] = useState([]);
  // initial data load
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    retrieveCSVData();
  }, []);

  async function retrieveCSVData() {
    try {
      // eslint-disable-next-line no-shadow
      const { data } = await getCSVData();
      setCsvRows(data.rows);
      setCsvColumns(data.columns);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <>
      <MDBox display="flex" justifyContent="flex-end">
        {selectedRows.length > 0 ? (
          <Button
            xs={{ mb: 3 }}
            size="large"
            onClick={() => console.log(JSON.stringify(selectedRows))}
            endIcon={<Download />}
          >
            Download
          </Button>
        ) : null}
      </MDBox>
      <div style={{ height: 600 }}>
        {csvColumns.length > 0 ? (
          <DataGrid
            style={{ border: "none" }}
            disableColumnSelector
            checkboxSelection
            rows={csvRows}
            columns={csvColumns}
            components={{ Toolbar: GridToolbar }}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              // eslint-disable-next-line no-shadow
              const selectedRows = csvRows.filter((row) => selectedIDs.has(row.id));

              setSelectedRows(selectedRows);
            }}
          />
        ) : null}
      </div>
    </>
  );
}
