import React, { Component } from "react";
import map from "lodash/map";
import {
  VictoryStack,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel
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
      widths.push(Object.keys(width));
      return width;
    });

    return this.createBars(widths, shoeSizes).map((bar, barPosition) => {
      return (
        <VictoryBar style={this.styles.bars} data={bar} key={barPosition} />
      );
    });
  };

  createBars = (widths, shoeSizes) => {
    return widths.map((width, widthpos) => {
      return width.map((value, position) => {
        //
        //Math.floor(Math.random() * 1000 + 1),
        return {
          x: widthpos + 1,
          y: shoeSizes[widthpos][value],
          fill: this.applyFillColor(value)
        };
      });
    });
  };

  applyFillColor = widthValue => {
    let stackColor = "";
    config.stackColors.filter(color => {
      if (color[0] === widthValue) {
        stackColor = color[1];
      }
    });
    return stackColor;
  };

  getShoeSizes = () => {
    return map(this.props.sizes, (size, sizeKey) => {
      return sizeKey;
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
    const horizontalLength = this.getShoeSizes().length;
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
            y: [0, 150]
          }}
          domainPadding={10}
          width={300}
          height={150}
        >
          <VictoryLabel
            style={this.styles.titleLabel}
            text={title}
            x={30}
            y={15}
            textAnchor="middle"
          />
          <VictoryLabel
            style={this.styles.widthsLabel}
            text="Shoe Widths"
            x={278}
            y={15}
            textAnchor="middle"
          />
          {config.stackColors.map(color => {
            return [
              <VictoryLabel
                style={this.styles.colorLabels}
                text={color[0]}
                x={color[2]}
                y={color[3]}
                textAnchor="start"
              />,
              <svg>
                <rect
                  x={color[4]}
                  y={color[5]}
                  width="5"
                  height="4"
                  fill={color[1]}
                />
              </svg>
            ];
          })}

          <VictoryStack
            animate={this.styles.animate}
            style={{
              data: { width: 6 }
            }}
          >
            {this.renderBar()}
          </VictoryStack>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            style={this.styles.horizontalAxisLabel}
            tickFormat={this.getShoeSizes().sort((last, next) => last - next)}
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
    horizontalAxisLabel: {
      axis: {
        stroke: "black",
        strokeOpacity: 12
      },
      tickLabels: {
        fontSize: "4px",
        fontFamily: "inherit",
        fillOpacity: 1,
        margin: 3,
        padding: 3
      }
    },
    animate: {
      duration: 500,
      easing: "bounce",
      onload: { duration: 100 }
    },
    colorLabels: {
      fontSize: "3px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    widthsLabel: {
      fontSize: "5px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },
    titleLabel: {
      fontSize: "5px",
      fontFamily: "inherit",
      fontWeight: "inherit"
    },

    bars: {
      data: { stroke: "black", strokeWidth: 0.1 }
    }
  };
}
export default StackedBarChart;
