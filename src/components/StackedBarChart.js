import React, { Component } from "react";
import map from "lodash/map";
import {
  VictoryStack,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryGroup
} from "victory";
import PaginationButton from "./PaginationButton";
import config from "../config/config";

class StackedBarChart extends Component {
  state = {
    clicked: false
  };
  componentDidMount() {
    this.props.addShoeSizesAsync();
  }

  renderBar = () => {
    const widths = [];
    const shoeSizes = map(this.props.sizes, width => {
      //rename this to shoeLenghts
      widths.push(Object.keys(width));
      return width;
    });

    let sorted = [];
    const bars = this.createBars(widths, shoeSizes);
    config.stackColors.map((color, index) => {
      sorted.push(
        bars.map(bar => {
          return bar.find(bar => bar.label === color[0]);
        })
      );
    });

    return sorted.map((barArray, index) => {
      return barArray.filter(barValues => barValues);
    });
  };
  createBars = (widths, shoeSizes) => {
    return widths.map((width, widthPos) => {
      return width.map((value, position) => {
        const barValues = {
          ...this.applyFillColorAndBarPosition(value, widthPos)
        };
        return {
          x: barValues.barPosition,
          y: shoeSizes[widthPos][value],
          fill: barValues.barColor,
          label: value
        };
      });
    });
  };

  applyFillColorAndBarPosition = (widthValue, widthPos) => {
    let stackColor = "";
    let barPosition = 0;

    config.stackColors.filter(color => {
      if (color[0] === widthValue) {
        stackColor = color[1];
        barPosition = widthPos + 1;
      }
    });
    return { barColor: stackColor, barPosition: barPosition };
  };

  getFeetLengthAmount = () => {
    return map(this.props.sizes, (length, lengthKey) => {
      return lengthKey;
    });
  };

  handlePagination = () => {
    this.setState({
      clicked: !this.state.clicked
    });

    this.state.clicked
      ? this.props.addShoeSizesAsync()
      : this.props.addSubsequentShoeSizesAsync(this.props.nextPage);
  };

  render() {
    const horizontalLength = this.getFeetLengthAmount().length;
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
            y: [0, 600]
          }}
          width={790}
          height={400}
        >
          <VictoryLabel
            style={this.styles.titleLabel}
            text={title}
            x={65}
            y={20}
            textAnchor="middle"
          />
          <VictoryLabel
            style={this.styles.widthsLabel}
            text="Shoe Widths"
            x={278}
            y={15}
            textAnchor="start"
          />

          {config.stackColors.map(color => {
            return (
              <svg viewBox="0 0 175 270">
                <VictoryLabel
                  style={this.styles.colorLabels}
                  text={color[0]}
                  x={color[2]}
                  y={color[3]}
                  textAnchor="start"
                />
                <rect
                  x={color[4]}
                  y={color[5]}
                  width="5"
                  height="4"
                  fill={color[1]}
                />
              </svg>
            );
          })}
          <VictoryGroup offset={2.8} domainPadding={{ x: [10, -10], y: 0 }}>
            {/* <VictoryStack style={{ data: { width: 3.7 } }}>
              <VictoryBar
                data={[
                  { x: 1, y: 40, fill: "red", label: "D" },
                  { x: 2, y: 120, fill: "red", label: "D" },
                  { x: 7, y: 200, fill: "red", label: "D" },
                  { x: 8, y: 200, fill: "yellow", label: "D" }
                ]}
              />
            </VictoryStack>
            <VictoryStack style={{ data: { width: 4 } }}>
              <VictoryBar
                data={[
                  { x: 4, y: 100, fill: "yellow" },
                  { x: 1, y: 159, fill: "magenta" },
                  { x: 7, y: 40, fill: "brown" }
                ]}
              />
            </VictoryStack>
            <VictoryStack style={{ data: { width: 4 } }}>
              <VictoryBar
                data={[
                  { x: 1, y: 100, fill: "magenta" },
                  { x: 9, y: 159, fill: "green" },
                  { x: 14, y: 40, fill: "brown" }
                ]}
              />
            </VictoryStack>*/}
            {this.renderBar().map(data => {
              return (
                <VictoryStack
                  // animate={this.styles.animate}
                  style={{ data: { width: 6 }, labels: { fontSize: "0px" } }}
                >
                  <VictoryBar data={data} style={this.styles.bars} />
                </VictoryStack>
              );
            })}
          </VictoryGroup>

          <VictoryAxis
            dependentAxis
            style={this.styles.verticalAxis}
            tickValues={[1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
            tickFormat={[1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
          />
          <VictoryAxis
            style={this.styles.horizontalAxis}
            /*tickValues={[
              0.9,
              1.8,
              2.8,
              3.8,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18
            ]}*/
            tickFormat={this.getFeetLengthAmount().sort(
              (last, next) => last - next
            )}
          />
        </VictoryChart>
        <PaginationButton
          handlePagination={this.handlePagination}
          clicked={this.state.clicked}
        />
      </React.Fragment>
    );
  }

  styles = {
    horizontalAxis: {
      axis: {
        stroke: "black",
        strokeOpacity: 10
      },
      tickLabels: {
        fontSize: 9,
        fontFamily: "inherit",
        padding: 5
      }
    },

    verticalAxis: {
      axis: {
        stroke: "black",
        strokeOpacity: 5
      },
      tickLabels: {
        fontSize: 9,
        fontFamily: "inherit",
        padding: 5
      }
    },
    animate: {
      duration: 1000,
      easing: "bounce",
      onload: { duration: 200 }
    },
    colorLabels: {
      fontSize: "4px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    widthsLabel: {
      fontSize: "9px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    titleLabel: {
      fontSize: "12px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },

    bars: {
      data: { stroke: "black", strokeWidth: 0.1 }
    }
  };
}
export default StackedBarChart;
