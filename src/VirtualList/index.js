import React from "react";

export default class VirtualList extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div onScroll={this.handleScroll} {...props}>
        <div style={`${STYLE_INNER} height:${data * rowHeight}px;`}>
          <div style={`${STYLE_CONTENT} top:${start * rowHeight}px;`}>
            {renderRow(start, end)}
          </div>
        </div>
      </div>
    );
  }
}
