import React from "react";

export default class VirtualList extends React.Component {
  handleScroll = () => {};
  componentDidMount() {}
  componentDidUpdate() {
    this.resize();
  }
  render() {
    const { renderRow } = this.props;
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
