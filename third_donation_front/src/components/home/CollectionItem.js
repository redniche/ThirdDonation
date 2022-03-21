import { memo } from 'react';

/**
 * 컬렉션을 표시하기 위한 컴포넌트
 * @param {*} param0
 * @returns
 */
const CollectionItem = ({ avatar, banner, username, tokenStandard, collectionId }) => {
  return (
    <div className="itm">
      <div className="nft_coll">
        <div className="nft_wrap">
          <span>
            <img src={banner} className="lazy img-fluid" alt="" />
          </span>
        </div>
        <div className="nft_coll_pp">
          <span onClick={() => window.open('/collection/' + collectionId, '_self')}>
            <img className="lazy" src={avatar} alt="" />
          </span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <span onClick={() => window.open('/collection/' + collectionId, '_self')}>
            <h4>{username}</h4>
          </span>
          <span>{tokenStandard}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CollectionItem);
