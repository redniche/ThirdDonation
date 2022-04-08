// import React from 'react';
import MsgRecord from '../../components/artist/MsgRecordList';
import PanelLayout from '../../components/layout/PanelLayout';
import '../../assets/record.scss';

const ArtistRecord = () => (
  <PanelLayout title="후원 메시지">
    <div className="container">
      <div className="row m-10-hor"></div>
    </div>
    <MsgRecord />
  </PanelLayout>
);
export default ArtistRecord;
