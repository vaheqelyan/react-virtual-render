import React from "react";

export default class HorizontalList extends React.Component {
  new = 0;
  old = 0;
  state = { width: 0, selection: [] };
  resize = () => {
    if (this.state.width !== this.base.offsetWidth) {
      this.setState({ width: this.base.offsetWidth });
    }
  };

  componentDidUpdate() {
    this.resize();
  }

  componentDidMount() {
    this.resize();

    const { rowWidth, overscanCount, data } = this.props;
    const { width } = this.state;
    const offset = this.base.scrollTop;
    let start = (offset / rowWidth) | 0;

    let visibleRowCount = (width / rowWidth) | 0;

    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }

    let end = start + 1 + visibleRowCount;
    let selection = data.slice(start, end);

    this.setState({ start: start, selection: selection });

    this.base.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }

  setBase = node => (this.base = node);

  render() {
    const { props, state, handleScroll, setBase } = this;
    const { start, selection } = state;
    const { offset, rowWidth, selection, start, data, renderRow } = props;

    return (
      <div ref={setBase} onScroll={handleScroll} {...props}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            minHeight: "100%",
            width: `${data.length * rowWidth}px`
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              overflow: "visible",
              left: `${start * rowWidth}px`
            }}
          >
            <div class="pan">{selection.map(renderRow)}</div>
          </div>
        </div>
      </div>
    );
  }
}

HorizontalList.defaultProps = {
  selection: [],
  rowWidth: 0,
  overscanCount: 10
};
