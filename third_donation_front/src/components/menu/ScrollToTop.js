import React, { Component } from 'react';

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    // 기본 상태는 맨 위니까 비활성화로 선언
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    // 스크롤 이벤트가 발생하면 실행
    document.addEventListener('scroll', function () {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    // 현재 페이지에서 Y위치가 600초과라면
    if (window.pageYOffset > 600) {
      this.setState({
        // 활성화시키기
        is_visible: true,
      });
    }
    // 아니라면
    else {
      this.setState({
        // 비활성화 시키기
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      // top, left, behavior가 옵션값으로 입력된다.
      // top의 경우 세로 위치, left의 경우는 가로 위치를 나타낸다.
      top: 0,
      behavior: 'smooth',
      // auto, instant, smooth 3가지가 있음
      // auto와 instant의 경우 바로 해당 위치값으로 이동
      // smooth의 경우 부드럽게 이동하는 애니메이션 효과를 보여줌
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div id="scroll-to-top" className="init">
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <i className=""></i>
          </div>
        )}
      </div>
    );
  }
}
