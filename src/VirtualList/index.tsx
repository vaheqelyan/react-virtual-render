import * as React from "react";

interface IVirtualListProps {
  rowHeight: number;
  overscanCount: number;
  data: any[];
  className: string;
  renderRow: (value: any, index: number) => JSX.Element;
}

interface IVirtualListDefaultProps {
  selection: any[];
  rowHeight: number;
  overscanCount: 0;
}

interface IVirtualListState {
  selection: any[];
  start: number;
  height: number;
}

export default class VirtualList extends React.Component<IVirtualListProps, IVirtualListState> {
  public static defaultProps: IVirtualListDefaultProps = {
    selection: [],
    rowHeight: 0,
    overscanCount: 0
  };

  public new = 0;
  public old = 0;
  public base: HTMLElement | null = null;
  public state = { selection: [], start: 0, height: 0 };
  public handleScroll = () => {
    const offset = this.base.scrollTop;

    const { rowHeight, overscanCount, data } = this.props;
    const { height } = this.state;

    let start = (offset / rowHeight) | 0;

    let visibleRowCount = (height / rowHeight) | 0;

    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }

    const end = start + 1 + visibleRowCount;

    this.old = this.new;

    this.new = start * rowHeight;

    if (this.new !== this.old) {
      const selection = data.slice(start, end);
      this.setState({ start, selection });
    }
  };
  public resize = () => {
    if (this.state.height !== this.base.offsetHeight) {
      this.setState({ height: this.base.offsetHeight });
    }
  };
  public setBase = (node: HTMLElement) => (this.base = node);
  public componentDidMount() {
    this.resize();
    this.base.addEventListener("resize", this.resize);

    const offset = this.base.scrollTop;

    const { rowHeight, overscanCount, data } = this.props;
    const { height } = this.state;

    let start = (offset / rowHeight) | 0;

    let visibleRowCount = (height / rowHeight) | 0;

    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }

    const end = start + 1 + visibleRowCount;

    this.old = this.new;

    this.new = start * rowHeight;

    const selection = data.slice(start, end);
    this.setState({ start, selection });
  }
  public componentDidUpdate() {
    this.resize();
  }
  public componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }
  public render(): JSX.Element {
    const { handleScroll, props, setBase, state } = this;
    const { renderRow, data, rowHeight, className } = props;
    const { selection, start } = state;

    return (
      <div ref={setBase} onScroll={handleScroll} className={className}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            minHeight: "100%",
            height: `${data.length * rowHeight}px`
          }}
        >
          <div
            style={{
              position: "absolute",
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
