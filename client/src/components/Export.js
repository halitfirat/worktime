import React from 'react';
import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet, ExcelColumn } = ExcelFile;

const Export = ({ getMonthWorktimes }) => {
  return (
    <ExcelFile
      element={
        <div className="button-fill left" id="button-fill">
          <div id="spin"></div>
          <span>Export</span>
        </div>
      }
      filename="Worktime"
    >
      <ExcelSheet data={getMonthWorktimes()} name="Worktime">
        <ExcelColumn label="Date" value="date" />
        <ExcelColumn label="Project" value="project" />
        <ExcelColumn label="Start" value="start" />
        <ExcelColumn label="Pause" value="pause" />
        <ExcelColumn label="End" value="end" />
        <ExcelColumn label="Comment" value="comment" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Export;
