import { memo, useState } from 'react';
import Select from 'react-select';
import { categories, search } from '../constants/salefilters';

/**
 * NFT 탐색기 등에서 사용될 필터 컴포넌트
 * @returns
 */
const SaleFilterBar = ({
  searchKind,
  searchWord,
  fileType,
  onChangeMinPrice,
  onChangeMaxPrice,
  onChangeWishCount,
}) => {
  const [text, setText] = useState('');

  const onChangeWord = (e) => {
    setText(e.target.value);
  };

  const searchValue = {
    value: null,
    label: '검색 필터',
  };
  const defaultValue1 = {
    value: null,
    label: 'NFT 종류 필터',
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: '#fff',
      color: '#333',
      borderRadius: state.isFocused ? '0' : 0,
      '&:hover': {
        background: '#eee',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base) => ({
      ...base,
      padding: 2,
    }),
  };

  return (
    <div>
      <div className="items_filter mt-1">
        <div className="d-flex">
          <div className="dropdownSelect one">
            <Select
              placeholder={<div> {searchValue.label} </div>}
              styles={customStyles}
              menuContainerStyle={{ zIndex: 999 }}
              options={[searchValue, ...search]}
              onChange={(e) => searchKind(e)}
            />
          </div>
          <div className="row form-dark" id="form_quick_search" name="form_quick_search">
            <div className="col">
              <input
                className="form-control"
                id="name_1"
                name="name_1"
                placeholder="검색어"
                type="text"
                value={text}
                onChange={onChangeWord}
              />
              <button id="btn-submit">
                <i
                  className="fa fa-search bg-color-secondary"
                  onClick={() => {
                    setText('');
                    searchWord(text);
                  }}></i>
              </button>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="dropdownSelect one" style={{ marginLeft: '10px' }}>
            <Select
              placeholder={<div> {defaultValue1.label} </div>}
              styles={customStyles}
              menuContainerStyle={{ zIndex: 999 }}
              options={[defaultValue1, ...categories]}
              onChange={(e) => fileType(e)}
            />
          </div>
          <div className="d-flex" style={{ marginLeft: '20px' }}>
            <input
              className="form-control"
              style={{ width: '150px' }}
              id="minPrice"
              name="minPrice"
              placeholder="최소 가격 (SSF)"
              type="number"
              onChange={(e) => onChangeMinPrice(e.target.value)}
            />
            <input
              className="form-control"
              style={{ width: '150px' }}
              id="maxPrice"
              name="maxPrice"
              placeholder="최대 가격 (SSF)"
              type="number"
              onChange={(e) => onChangeMaxPrice(e.target.value)}
            />
            <input
              className="form-control"
              style={{ marginLeft: '20px', width: '90px' }}
              id="wishCount"
              name="wishCount"
              placeholder="하트 수"
              type="number"
              onChange={(e) => onChangeWishCount(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleFilterBar);
