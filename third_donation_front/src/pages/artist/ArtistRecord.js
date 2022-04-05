// import React from 'react';
import AmountRecord from '../../components/artist/AmountRecord';
import MsgRecord from '../../components/artist/MsgRecordList';
import PanelLayout from '../../components/layout/PanelLayout';
import '../../assets/record.scss';

const ArtistRecord = () => (
  <PanelLayout title="예술가 기록">
    <div className="container">
      <div className="row m-10-hor"></div>
    </div>
    <AmountRecord />
    <MsgRecord />
  </PanelLayout>
);
export default ArtistRecord;
