import React from "react";

export default class VirtualList extends React.Component {
  handleScroll = () => {};
  resize = () => {
    if (this.state.height !== this.base.offsetHeight) {
      this.setState({ height: this.base.offsetHeight });
    }
  };
  componentDidMount() {
    this.resize();
    this.base.addEventListener("resize", this.resize);

    var offset = this.base.scrollTop;

    const { rowHeight, overscanCount } = this.props;
    const { height } = this.state;

    let start = (offset / rowHeight) | 0;

    let visibleRowCount = (height / rowHeight) | 0;

    // Overscan: render blocks of rows modulo an overscan row count
    // This dramatically reduces DOM writes during scrolling
    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }
  }
  componentDidUpdate() {
    this.resize();
  }
  componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }
  render() {
    const { renderRow } = this.props;
    return (
      <div ref={node => (this.base = node)} onScroll={this.handleScroll} {...props}>
        <div style={`${STYLE_INNER} height:${data * rowHeight}px;`}>
          <div style={`${STYLE_CONTENT} top:${start * rowHeight}px;`}>{renderRow(start, end)}</div>
        </div>
      </div>
    );
  }
}
