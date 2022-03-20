import React, { memo, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { categories, status, itemsType } from '../constants/filters';
import {
  filterCategories,
  filterStatus,
  filterItemsType,
  filterNftTitle,
} from '../../store/actions';

/**
 * NFT 탐색기 등에서 사용될 필터 컴포넌트
 * @returns
 */
const TopFilterBar = () => {
  const dispatch = useDispatch();
  const handleCategory = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterCategories({ value, singleSelect: true }));
    },
    [dispatch],
  );

  const handleStatus = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterStatus({ value, singleSelect: true }));
    },
    [dispatch],
  );

  const handleItemsType = useCallback(
    (option) => {
      const { value } = option;
      dispatch(filterItemsType({ value, singleSelect: true }));
    },
    [dispatch],
  );

  const filterNftTitles = useCallback(
    (event) => {
      const value = event.target.value;
      dispatch(filterNftTitle(value));
    },
    [dispatch],
  );

  const defaultValue1 = {
    value: null,
    label: 'NFT 종류 필터',
  };
  const defaultValue2 = {
    value: null,
    label: '판매 방식 필터',
  };
  const defaultValue3 = {
    value: null,
    label: '판매 종류 필터',
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
    <div className="items_filter">
      <form className="row form-dark" id="form_quick_search" name="form_quick_search">
        <div className="col">
          <input
            className="form-control"
            id="name_1"
            name="name_1"
            placeholder="검색어"
            type="text"
            onChange={filterNftTitles}
          />
          <button id="btn-submit">
            <i className="fa fa-search bg-color-secondary"></i>
          </button>
          <div className="clearfix"></div>
        </div>
      </form>
      <div className="dropdownSelect one">
        <Select
          placeholder={<div> {defaultValue1.label} </div>}
          styles={customStyles}
          menuContainerStyle={{ zIndex: 999 }}
          options={[defaultValue1, ...categories]}
          onChange={handleCategory}
        />
      </div>
      <div className="dropdownSelect two">
        <Select
          placeholder={<div> {defaultValue2.label} </div>}
          styles={customStyles}
          options={[defaultValue2, ...status]}
          onChange={handleStatus}
        />
      </div>
      <div className="dropdownSelect three">
        <Select
          placeholder={<div> {defaultValue3.label} </div>}
          styles={customStyles}
          options={[defaultValue3, ...itemsType]}
          onChange={handleItemsType}
        />
      </div>
    </div>
  );
};

export default memo(TopFilterBar);
