import React from "react";

export default class VirtualList extends React.Component {
  new = 0;
  old = 0;
  state = { selection: [], start: 0 };
  handleScroll = () => {
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

    this.old = this.new;

    this.new = start * rowHeight;

    if (this.new !== this.old) {
      let selection = data.slice(start, end);
      this.setState({ start, selection });
    }
  };
  resize = () => {
    if (this.state.height !== this.base.offsetHeight) {
      this.setState({ height: this.base.offsetHeight });
    }
  };
  setBase = node => (this.base = node);
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

    this.old = this.new;

    this.new = start * rowHeight;

    let selection = data.slice(start, end);
    this.setState({ start, selection });
  }
  componentDidUpdate() {
    this.resize();
  }
  componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }
  render() {
    const { handleScroll, props, setBase, state } = this;
    const { renderRow, data, rowHeight } = props;
    const { selection, start } = state;

    return (
      <div ref={setBase} onScroll={handleScroll} class={class}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            minHeight: "100%",
            height: `${data * rowHeight}px`
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              overflow: "visible",
              top: `${start * rowHeight}px`
            }}
          >
            {selection.map(renderRow)}
          </div>
        </div>
      </div>
    );
  }
}
