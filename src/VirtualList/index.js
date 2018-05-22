import React from "react";

export default class VirtualList extends React.Component {
  new = 0;
  old = 0;
  state = { selection: [], start: 0 };
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

    const { rowHeight, overscanCount, data } = this.props;
    const { height } = this.state;

    let start = (offset / rowHeight) | 0;

    let visibleRowCount = (height / rowHeight) | 0;

    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }

    let end = start + 1 + visibleRowCount;

    // let selection = data.slice(start, end);

    this.old = this.new;

    this.new = start * rowHeight;

    if (this.new !== this.old) {
      let selection = data.slice(start, end);
      this.setState({ start, selection });
    }
  }
  componentDidUpdate() {
    this.resize();
  }
  componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }
  render() {
    const { handleScroll, props } = this;
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
