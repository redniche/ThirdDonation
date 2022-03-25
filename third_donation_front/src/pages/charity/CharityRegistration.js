import BasicLayout from '../../components/layout/BasicLayout';

const CharityRegistration = () => (
  <BasicLayout>
    <div style={{ height: 130 }}></div>
    <section id="section-main" aria-label="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-4 ">
            <h1>
              <i className="fa fa-user"></i> 자선단체 등록
            </h1>
            <p>NFT작품의 수익 5%는 등록된 자선단체에게 기부됩니다</p>

            <div className="spacer-10"></div>

            <form name="contactForm" id="contact_form" className="form-border" action="#">
              <div className="">
                <div className="col-md-6">
                  <div className="field-set">
                    <label>자선단체 명:</label>
                    <input type="text" name="name" id="name" className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>자선단체 주소:</label>
                    <input type="text" name="email" id="email" className="form-control" />
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="col-md-12">
                  <div id="submit" className="pull-left">
                    <input
                      type="submit"
                      id="send_message"
                      value="등록"
                      className="btn btn-main color-2"
                    />
                  </div>
                  <div style={{ height: 70 }}></div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </BasicLayout>
);
export default CharityRegistration;
