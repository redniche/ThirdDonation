import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProfileLayout from '../../components/layout/ProfileLayout';
import { fetchAuthorList } from '../../store/actions/thunks';
import Slider from '../../components/nfts/chart/Slider';

/**
 * authorId를 받아 해당 유저의 프로필을 표시해주는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const ChartProfile = ({ authorId }) => {
  // 리덕스 부분
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  // 컴포넌트 레이아웃
  return (
    <ProfileLayout>
      <section className="container no-top">
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>
        <div className="spacer-20"></div>

        <div>
          <Slider />;
        </div>
      </section>
    </ProfileLayout>
  );
};
export default memo(ChartProfile);
