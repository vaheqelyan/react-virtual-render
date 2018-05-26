import * as React from "react";

const STYLE_INNER = "position:relative; overflow:hidden; width:100%; min-height:100%;";

const STYLE_CONTENT = "position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;";

interface IVirtualGridState {
  height: number;
  start: number;
  end: number;
}

interface IVirtualGridProps {
  overscanCount: number;
  rowHeight: number;
  data: any[];
  renderRow: (start: number, end: number) => JSX.Element;
}

interface IVirtualGridDefaultProps {
  overscanCount: number;
  rowHeight: number;
}

export default class VirtualGrid extends React.Component<IVirtualGridProps, IVirtualGridState> {
  public static defaultProps: IVirtualGridDefaultProps = {
    overscanCount: 10,
    rowHeight: 0
  };
  public base: HTMLElement | null = null;
  public new = 10;
  public old = 0;
  public deb = true;
  public state = { height: 0, start: 0, end: 0 };
  public resize = () => {
    if (this.state.height !== this.base.offsetHeight) {
      this.setState({ height: this.base.offsetHeight });
    }
  };

  public handleScroll = () => {
    const { overscanCount = 10, rowHeight } = this.props;
    const { height } = this.state;

    let start = (this.base.scrollTop / rowHeight) | 0;

    let visibleRowCount = (height / rowHeight) | 0;

    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }

    const end = start + 1 + visibleRowCount;

    this.old = this.new;

    this.new = start * rowHeight;

    if (this.new !== this.old) {
      this.setState({ start, end });
    }
  };

  public componentDidUpdate() {
    this.resize();
  }

  public componentDidMount() {
    this.resize();

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

    this.setState({ start, end });

    this.base.addEventListener("resize", this.resize);
  }

  public componentWillUnmount() {
    this.base.removeEventListener("resize", this.resize);
  }

  public setBase = (node: HTMLElement) => (this.base = node);

  public render(): JSX.Element {
    const { handleScroll, props, state, setBase } = this;

    const { start, end } = state;
    const { data, rowHeight, renderRow } = props;
    return (
      <div ref={setBase} onScroll={handleScroll}>
        <div className="grid" style={{ height: `${data.length * rowHeight}px` }}>
          <div className="grid-content" style={{ top: `${start * rowHeight}px` }}>
            <div className="flex-container ">{renderRow(start, end)}</div>
          </div>
        </div>
      </div>
    );
  }
}
