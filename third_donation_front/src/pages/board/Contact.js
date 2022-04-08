import PanelLayout from '../../components/layout/PanelLayout';
import Category from '../../components/contact/Category2';
import Location from '../../components/contact/Location';

const Contact = () => {
  return (
    <PanelLayout title="문의">
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <br />
              <br />
              <h3>편안하고 따뜻한 서비스를 제공하는 써드 도네이션입니다</h3>
              <div className="small-border"></div>
              <span>
                Third Donation의 서비스에 대해 궁금증이나 문의할 내용이 있다면, 언제든 편하게
                연락주세요
              </span>
              <br />
              <br />
            </div>
            <br />
          </div>
        </div>
        <Category />
        <br />
      </section>

      <section className="container">
        <div className="col-lg-12">
          <Location />
        </div>
        <br />
      </section>
    </PanelLayout>
  );
};

export default Contact;
