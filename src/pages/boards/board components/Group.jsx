import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import GroupInput from './group/GroupInput';
import GroupMessages from './group/GroupMessages';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ReportConnection, serReportList } from '../../../services/masterServices';
import { useDispatch, useSelector } from 'react-redux';
import { RsetShowLoading, RsetShowToast } from '../../../hooks/slices/main';
import Toastify from '../../../components/Toastify';
import { RsetBoardMessage } from '../../../hooks/slices/boardSlice';
import Loading from '../../../components/Loading';
import { useLocation } from 'react-router-dom';
import asyncWrapper from '../../../utils/asyncWrapper';
import GroupReport from './group/GroupReport';
import moment from 'jalali-moment';
import { useMediaQuery } from 'react-responsive';

export default function Group() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const messagesList = [
    // { content: 'hdhdhd', userId: 1, name: 'علی جعفری', time: '12:00' },
    // { content: 'hdhdhd', userId: 2, name: 'علی جعفری', time: '12:00' },
    // { content: 'hdhdhd', userId: 1, name: 'علی جعفری', time: '12:00' }
  ];
  const boardMessageInfo = useSelector((state) => state.board?.boardMessage);
  const dispatch = useDispatch();
  const location = useLocation();
  const [connection, setConnection] = useState(null);
  const [reportList, setReportList] = useState(null);

  // show notif states
  const main = useSelector((state) => state.main);

  const sendMessage = async (event) => {
    event.preventDefault();
    let sentTime = new Date();
    sentTime = `${sentTime.getHours()}:${sentTime.getMinutes().toString().length > 1 ? '' : '0'}${sentTime.getMinutes()}`;
    // if (connection) await connection.send('SendMessage', boardMessageInfo.inputText);
    boardMessageInfo.inputText.length > 0 &&
      dispatch(
        RsetBoardMessage({
          ...boardMessageInfo,
          inputText: '',
          messagesList: [
            ...boardMessageInfo.messagesList,
            {
              content: boardMessageInfo.inputText,
              userId: 1,
              name: 'علی جعفری',
              time: sentTime
            }
          ]
        })
      );
  };

  const handleShowMessageNotif = (message) => {
    dispatch(RsetShowToast({ ...main?.showToast, title: message, bg: 'info', show: true }));
  };

  const handleGetReports = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const reportListReq = await serReportList(location?.state?.item?.id);
    dispatch(RsetShowLoading({ value: false }));

    if (reportListReq?.data?.code === 1) {
      setReportList(reportListReq?.data?.data);
    }
  });

  useEffect(() => {
    // const connect = new HubConnectionBuilder()
    //   .withUrl(`${ReportConnection}?boardid=${location?.state?.item?.id}`)
    //   .build();
    // setConnection(connect);

    dispatch(RsetBoardMessage({ ...boardMessageInfo, messagesList: messagesList }));

    handleGetReports();
  }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         connection.on('ReceiveMessage', (message) => {
  //           handleShowMessageNotif(message);
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [connection]);

  return (
    <>
      <Toastify />

      <div className="board_group w-100 d-flex flex-column-reverse justify-content-start align-items-center position-relative">
        <div className={`d-flex flex-column w-100 ${isSmallScreen ? 'px-2' : ' px-4'}`}>
          {boardMessageInfo.messagesList
            ? boardMessageInfo.messagesList.map((mes, i) => (
                <GroupMessages
                  content={mes.content}
                  name={mes.name}
                  time={mes.time}
                  userId={{
                    current: mes.userId,
                    prev: boardMessageInfo.messagesList[i - 1]?.userId
                  }}
                  key={i}
                />
              ))
            : // <Loading />
              null}

          {reportList
            ? reportList.length !== 0
              ? reportList.map((report, index) => (
                  <GroupReport
                    key={index}
                    data={report}
                    date={
                      reportList[index - 1]?.id
                        ? moment(reportList[index - 1].createDateTime)
                            .locale('fa')
                            .format('YY/MM/DD') ===
                          moment(report.createDateTime).locale('fa').format('YY/MM/DD')
                          ? false
                          : true
                        : true
                    }
                  />
                ))
              : null
            : null}
        </div>

        <GroupInput sendMessage={sendMessage} />
      </div>
    </>
  );
}
