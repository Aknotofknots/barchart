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
import config from "../config/config";

class StackedBarChart extends Component {
  componentDidMount() {
    this.props.addShoeSizesAsync();
  }

  renderBar = () => {
    const widths = [];
    const shoeLengths = map(this.props.sizes, width => {
      widths.push(Object.keys(width));
      return width;
    });

    let sortedBars = [];
    const bars = this.createBars(widths, shoeLengths);
    config.stackColors.map((color, index) => {
      sortedBars.push(
        bars.map(bar => {
          return bar.find(bar => bar.label === color[0]);
        })
      );
    });

    return sortedBars.map((barArray, index) => {
      return barArray.filter(barValues => barValues);
    });
  };

  createBars = (widths, shoeLengths) => {
    return widths.map((width, widthPos) => {
      return width.map((value, position) => {
        const barValues = {
          ...this.applyFillColorAndBarPosition(value, widthPos)
        };
        return {
          x: barValues.barPosition,
          y: shoeLengths[widthPos][value],
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

  render() {
    const horizontalLength = this.getFeetLengthAmount().length;
    const [system, gender] = this.props.title;
    const title = `Shoe Sizes Distribution \n ${system} - ${gender}`;

    return (
      <React.Fragment>
        <VictoryChart
          domain={{
            x: [0, horizontalLength ? horizontalLength : 18],
            y: [0, 600]
          }}
          width={700}
          height={330}
        >
          <VictoryLabel
            style={this.styles.titleLabel}
            text={title}
            x={98}
            y={20}
            textAnchor="middle"
          />
          <VictoryLabel
            style={this.styles.widthsLabel}
            text="Widths"
            x={658}
            y={15}
            textAnchor="start"
          />

          {config.stackColors.map(color => {
            return (
              <svg viewBox="0 0 210 270">
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
                  width="10"
                  height="8"
                  fill={color[1]}
                />
              </svg>
            );
          })}
          <VictoryGroup offset={2.8}>
            {this.renderBar().map((data, barPosition) => {
              return (
                <VictoryStack
                  animate={this.styles.animate}
                  style={{ data: { width: 8 }, labels: { fontSize: "0px" } }}
                >
                  <VictoryBar
                    data={data}
                    style={this.styles.bars}
                    key={barPosition}
                  />
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
            tickValues={[
              0.9,
              1.8,
              2.8,
              3.8,
              4.8,
              5.8,
              6.8,
              7.8,
              8.8,
              9.8,
              10.8,
              11.8,
              12.8,
              13.8,
              14.8,
              15.8,
              16.8,
              17.8
            ]}
            tickFormat={this.getFeetLengthAmount().sort(
              (last, next) => last - next
            )}
          />
        </VictoryChart>
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
      fontSize: "6px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    widthsLabel: {
      fontSize: "10px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    titleLabel: {
      fontSize: "10px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },

    bars: {
      data: { stroke: "black", strokeWidth: 0.1 }
    }
  };
}
export default StackedBarChart;
