import { Link } from '@reach/router';

/**
 * 카테고리를 표시하는 컴포넌트
 * @returns
 */
const Category = () => (
  <div className="row justify-content-center">
    {/* 3부분 / 1번 - 전체 */}
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="/explore">
        <i className="fa fa-search p-4"></i>
        <span>전체</span>
      </Link>
    </div>

    {/* 3부분 / 2번 - 이미지 */}
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="/explore">
        <i className="fa fa-image p-4"></i>
        <span>그림</span>
      </Link>
    </div>

    {/* 3부분 / 3번 - 영상 */}
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="/explore">
        <i className="fa fa-film p-4"></i>
        <span>영상</span>
      </Link>
    </div>
  </div>
);
export default Category;
