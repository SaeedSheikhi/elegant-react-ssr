import React from 'react';

class ScrollIntoView extends React.Component {
  componentDidMount () {
    this.scroll();
  }

  componentDidUpdate () {
    this.scroll();
  }

  scroll () {
    const { id } = this.props;
    if (!id) {
      return;
    }
    const element = document.getElementById(id) || document.querySelector(id);
    if (element) {
      element.scrollIntoView();
    }
  }

  render () {
    return this.props.children;
  }
}

export default ScrollIntoView;
