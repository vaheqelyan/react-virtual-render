import React from "react";

export default class HorizontalList extends React.Component {
  resize = () => {
    if (this.state.width !== this.base.offsetWidth) {
      this.setState({ width: this.base.offsetWidth });
    }
  };

  render(
    { data, rowWidth, renderRow, renderer, overscanCount = 10, sync, ...props },
    { offset = 0, width = 0, selection = [], start = 0 }
  ) {
    const { props } = this;
    const { offset, rowWidth, selection, start, data } = props;

    return (
      <div onScroll={this.handleScroll} {...props}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            minHeight: "100%",
            width: `${data.length * rowWidth}px`
          }}
        >
          <div style={`left:${start * rowWidth}px;`}>
            <div class="pan">{selection.map(renderRow)}</div>
            {renderer(selection)}
          </div>
        </div>
      </div>
    );
  }
}
