import React, { Component } from "react";
import map from "lodash/map";
import {
  VictoryStack,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer,
  VictoryPortal,
  VictoryLabel,
  VictoryZoomContainer,
  VictoryTooltip
} from "victory";

class StackedBarChart extends Component {
  state = {
    clicked: false
  };
  componentDidMount() {
    this.props.addShoeSizesAsync();
  }

  renderBar = () => {
    const { sizes } = this.props;
    let widths = [];
    const shoeSizes = map(sizes, size => {
      widths.push(Object.keys(size));
      return size;
    });
    const bars = widths.map((width, widthpos) => {
      return width.map((value, position) => {
        return {
          x: widthpos + 1,
          y: shoeSizes[widthpos][value],
          label: value
        };
      });
    });
    console.log("bars", bars);
    return bars.map((bar, barPosition) => (
      <VictoryBar
        style={{
          data: { stroke: "black", strokeWidth: 0.1 }
        }}
        data={bar}
        key={barPosition}
      />
    ));
  };

  getSizes = () => {
    return map(this.props.sizes, (size, sizeKey) => {
      return sizeKey;
    });
  };

  handlePagination = () => {
    this.setState({ clicked: !this.state.clicked });
    this.state.clicked
      ? this.props.addShoeSizesAsync()
      : this.props.addSubsequentShoeSizesAsync(this.props.nextPage);
  };

  render() {
    const horizontalLength = this.getSizes().length;
    const [system, gender] = this.props.title;
    const title =
      system !== undefined
        ? `Shoe Sizes Distribution \n ${system} - ${gender}`
        : "loading...";
    return (
      <React.Fragment>
        <VictoryChart
          domain={{
            x: [0, horizontalLength ? horizontalLength : 18],
            y: [0, 170]
          }}
          domainPadding={13}
          width={300}
          height={150}
        >
          <VictoryLabel
            style={{ fontSize: "4px", fontFamily: "Lato" }}
            text={title}
            x={30}
            y={20}
            textAnchor="middle"
          />

          <VictoryStack
            animate={{
              duration: 500,
              easing: "bounce",
              onload: { duration: 200 }
            }}
            colorScale={[
              "#D9CCC4",
              "#203647",
              "#60818E",
              "#EE8535",
              "#EA5E6B",
              "#E8D24B"
            ]}
            style={{
              data: { width: 8 },
              labels: {
                padding: 0,
                fontSize: "3px",
                fontFamily: "Lato",
                fontWeight: "300"
              }
            }}
          >
            {this.renderBar()}
            {/*dataset.map(data => <VictoryBar data={data} />)*/}
          </VictoryStack>
          <VictoryAxis
            style={{
              axis: {
                stroke: "black",
                strokeOpacity: 7
              },
              tickLabels: {
                fontSize: "4px",
                fontFamily: "inherit",
                fillOpacity: 1,
                margin: 3,
                padding: 3
              }
            }}
            tickFormat={this.getSizes().sort((last, next) => last - next)}
          />
        </VictoryChart>
        <button
          style={{
            position: "absolute",
            top: "75px",
            right: "20px",
            fontFamily: "Lato",
            fontWeight: "300"
          }}
          onClick={this.handlePagination}
        >
          next page
        </button>
      </React.Fragment>
    );
  }
}
export default StackedBarChart;
