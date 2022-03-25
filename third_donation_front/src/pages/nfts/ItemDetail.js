import { useState } from 'react';
import Clock from '../../components/nfts/Clock';
import BasicLayout from './../../components/layout/BasicLayout';
import saleArtTokenContracts from '../../contracts/index';

/**
 * NFT의 상세 정보를 보여주는 페이지 컴포넌트
 * @returns
 */
const ItemDetail = function () {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById('Mainbtn').classList.add('active');
    document.getElementById('Mainbtn1').classList.remove('active');
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById('Mainbtn1').classList.add('active');
    document.getElementById('Mainbtn').classList.remove('active');
  };

  const [openCheckout, setOpenCheckout] = useState(false);
  const [openCheckoutbid, setOpenCheckoutbid] = useState(false);

  const onClickBuy = async () => {
    try {
      // account 없으면 실행하지 말아라
      if (!account) return;
      const response = await saleArtTokenContract.methods
        .purchaseArtToken(artTokenId)
        .send({ from: account, value: artPrice });

      // transaction이 끝나면 뭘 실행할건지 지정해줘야함.
      if (response.status) {
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BasicLayout>
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img src="../img/items/big-1.jpg" className="img-fluid img-rounded mb-sm-30" alt="" />
            {/* <img src={ nft.preview_image && api.baseUrl + nft.preview_image.url} className="img-fluid img-rounded mb-sm-30" alt=""/> */}
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {/* 경매 마감일 */}
              경매 마감일 :
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
              {/* {nft.item_type === 'on_auction' && (
                <>
                  경매 마감일 :
                  <div className="de_countdown">
                    <Clock deadline={nft.deadline} />
                  </div>
                </>
              )} */}
              {/* 작품 이름 */}
              <h2>Pinky Ocean</h2>
              {/* <h2>{nft.title}</h2> */}
              {/* 작품 항목 */}
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>Art
                </div>
                {/* <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div> */}

                {/* 본 사람 */}
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>250
                </div>
                {/* <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div> */}

                {/* 좋아요 수 */}
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>18
                </div>
                {/* <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div> */}
              </div>
              {/* 작품 설명 */}
              <p>이 작품으로 말하자면, 나의 심리를 그림으로 표현한 것입니다.</p>
              {/* <p>{nft.description}</p> */}
              <div className="d-flex-row">
                <div className="mb-4">
                  {/* 작가 */}
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img className="lazy" src="../img/author/author-2.jpg" alt="" />
                        {/* <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/> */}
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>이우철</span>
                      {/* <span>{nft.author && nft.author.username}</span> */}
                    </div>
                  </div>
                </div>

                <div className="mr40">
                  <h6>owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img className="lazy" src="../img/author/author-3.jpg" alt="" />
                        {/* <img
                          className="lazy"
                          // src={nft.author && api.baseUrl + nft.author.avatar.url}
                          alt=""
                        /> */}
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      {/* <span>{nft.author && nft.author.username}</span> */}
                      <span>장예찬</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {/* 입찰자 리스트 */}
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      {/* {nft.bids && nft.bids.map((bid, index) => (
                        <div className="p_list" key={index}>
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>                                    
                            <div className="p_list_info">
                                Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                            </div>
                        </div>
                    ))} */}
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-1.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>장예찬</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-2.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>김재욱</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-3.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>김동주</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-4.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>박대언</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 히스토리 */}
                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      {/* {nft.history && nft.history.map((bid, index) => (
                        <div className="p_list" key={index}>
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>                                    
                            <div className="p_list_info">
                                Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                            </div>
                        </div>
                    ))} */}
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-5.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>장예찬</b> at 6/14/2021, 6:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-1.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>이우철</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-2.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>김재욱</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-3.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>김동주</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img className="lazy" src="../img/author/author-4.jpg" alt="" />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>박대언</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    {/* 구매버튼 */}
                    <button
                      className="btn-main lead mb-5 mr15"
                      onClick={() => setOpenCheckout(true)}>
                      Buy Now
                    </button>
                    {/* 입찰버튼 */}
                    <button
                      className="btn-main btn2 lead mb-5"
                      onClick={() => setOpenCheckoutbid(true)}>
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openCheckout && (
        <div className="checkout">
          <div className="maincheckout">
            <button className="btn-close" onClick={() => setOpenCheckout(false)}>
              x
            </button>
            <div className="heading">
              <h3>Checkout</h3>
            </div>
            <p>
              <span className="bold">[Pinky Ocean] #304</span>를 구매할 예정입니다.<br></br>
              <span className="bold">from 이우철</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control" />
              </div>
            </div>
            <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 ETH</div>
            </div>
            <button className="btn-main lead mb-5" onClick={onClickBuy}>
              Checkout
            </button>
          </div>
        </div>
      )}
      {openCheckoutbid && (
        <div className="checkout">
          <div className="maincheckout">
            <button className="btn-close" onClick={() => setOpenCheckoutbid(false)}>
              x
            </button>
            <div className="heading">
              <h3>Place a Bid</h3>
            </div>
            <p>
              <span className="bold">[Pinky Ocean] #304</span>를 구매할 예정입니다.<br></br>
              <span className="bold">from 이우철</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid (ETH)</h6>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="detailcheckout mt-3">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control" />
              </div>
            </div>
            <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 ETH</div>
            </div>
            <button className="btn-main lead mb-5">Checkout</button>
          </div>
        </div>
      )}
    </BasicLayout>
  );
};
export default ItemDetail;
