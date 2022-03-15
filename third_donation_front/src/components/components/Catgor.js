import React from 'react';
import { Link } from '@reach/router';

const catgor = () => (
  <div className="row justify-content-center">
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="">
        <i className="fa fa-search p-4"></i>
        <span>All</span>
      </Link>
    </div>
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="">
        <i className="fa fa-image p-4"></i>
        <span>Arts</span>
      </Link>
    </div>
    <div className="col-md-3 col-sm-4 col-6 mb-3 mx-3">
      <Link className="icon-box style-2 rounded" to="">
        <i className="fa fa-film p-4"></i>
        <span>Videos</span>
      </Link>
    </div>
  </div>
);
export default catgor;
