import React from "react";

export default class HorizontalList extends React.Component {
  resize = () => {
    if (this.state.width !== this.base.offsetWidth) {
      this.setState({ width: this.base.offsetWidth });
    }
  };

  render() {
    const { props, state, handleScroll } = this;
    const { start, selection } = state;
    const { offset, rowWidth, selection, start, data, renderRow } = props;

    return (
      <div onScroll={handleScroll} {...props}>
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
