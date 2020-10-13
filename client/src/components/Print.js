import React from 'react';
import { format } from 'date-fns';

import { periodSansPause, msToHM } from '../services/time';

const renderBorder = (count) => {
  return (
    <tr>
      <td colSpan={count} style={{ borderTop: 'solid 1px darkgray' }}></td>
    </tr>
  );
};

const getPeriodInHM = (end, start, pause) => {
  const ms = periodSansPause(end, start, pause);
  return msToHM(ms);
};

const Print = ({ getMonthWorktimes }) => {
  const worktimes = getMonthWorktimes().map((w) => {
    const { _id, date, project, start, pause, end, comment } = w;

    return (
      <div key={_id}>
        <table>
          <tbody>
            <tr>
              <td>Project:</td>
              <td colSpan="2">{project}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Comment:</td>
              <td colSpan="2">{comment}</td>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>{end}</td>
                      <td>End</td>
                    </tr>
                    <tr>
                      <td>-</td>
                      <td>{start}</td>
                      <td>Start</td>
                    </tr>
                    <tr>
                      <td>-</td>
                      <td>{pause}</td>
                      <td>Pause</td>
                    </tr>
                    {renderBorder(3)}
                    <tr>
                      <td></td>
                      <td>
                        <b>{getPeriodInHM(end, start, pause)}</b>
                      </td>
                      <td>Work</td>
                    </tr>
                    {renderBorder(3)}
                  </tbody>
                </table>
              </td>
              <td
                style={{
                  verticalAlign: 'bottom'
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          position: 'relative',
                          left: '475px'
                        }}
                      >
                        <b>{format(date, 'dd.MM.yyyy')}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    );
  });

  const print = () => {
    var content = document.getElementById('contents');
    var pri = document.getElementById('printOn').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <>
      <div id="contents" style={{ display: 'none' }}>
        <hr />
        {worktimes}
      </div>
      <div className="button-fill right" id="button-fill" onClick={print}>
        <div id="spin"></div>
        <span>Print</span>
      </div>
    </>
  );
};

export default Print;
