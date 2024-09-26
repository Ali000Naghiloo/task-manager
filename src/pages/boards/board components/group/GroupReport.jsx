import moment from 'jalali-moment';
import React from 'react';

export default function GroupReport({ date, data }) {
  // report date
  const m = moment(data?.createDateTime).locale('fa');

  if (data) {
    return (
      <div className="d-flex flex-column my-2 align-items-center w-100">
        <span className={date ? 'my-4 text-dark-emphasis' : 'd-none'}>
          {date ? `${m.format('dddd')} ${m.format('DD')} ${m.format('MMMM')} ` : null}
        </span>

        <div className="fw-bold font20 hover-element-border rounded-2 p-2 cursorPointer">
          {data.newValue}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
