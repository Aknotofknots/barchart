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
  VictoryTooltip,
  VictoryCandlestick
} from "victory";
import PaginationButton from "./PaginationButton";
import { read } from "fs";

class StackedBarChart extends Component {
  state = {
    clicked: false,
    stackColors: [
      ["A", "#4A9FD7", 282, 30, 275, 28],
      ["B", "#DD4E36", 282, 37, 275, 35],
      ["C", "#F68631", 282, 44, 275, 42],
      ["D", "#4D6A7C", 282, 51, 275, 49],
      ["E", "#7FBBC8", 282, 58, 275, 56],
      ["2A", "#F06AAC", 282, 65, 275, 63],
      ["2E", "#353272", 282, 72, 275, 70],
      ["3A", "#B7A29A", 282, 79, 275, 77],
      ["3E", "#24232B", 282, 86, 275, 84]
    ]
  };
  componentDidMount() {
    this.props.addShoeSizesAsync();
  }

  renderBar = () => {
    const { sizes } = this.props;
    let fill = "";
    let widths = [];
    const shoeSizes = map(sizes, width => {
      widths.push(Object.keys(width));
      return width;
    });
    const bars = widths.map((width, widthpos) => {
      return width.map((value, position) => {
        fill = this.applyFillColor(value);
        return {
          x: widthpos + 1,
          y: shoeSizes[widthpos][value],
          fill: fill
        };
      });
    });
    return bars.map((bar, barPosition) => {
      return (
        <VictoryBar
          style={{
            data: { stroke: "black", strokeWidth: 0.1 }
          }}
          data={bar}
          key={barPosition}
        />
      );
    });
  };

  applyFillColor = widthValue => {
    let stackColor = "";
    this.state.stackColors.filter(color => {
      if (color[0] === widthValue) {
        stackColor = color[1];
      }
    });
    return stackColor;
  };

  getSizes = () => {
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
            y: [0, 155]
          }}
          domainPadding={20}
          width={300}
          height={150}
        >
          <VictoryLabel
            style={{
              fontSize: "5px",
              fontFamily: "Lato, sans-serif",
              fontWeight: "300"
            }}
            text={title}
            x={30}
            y={15}
            textAnchor="middle"
          />
          <VictoryLabel
            style={{
              fontSize: "4px",
              fontFamily: "Lato, sans-serif",
              fontWeight: "300"
            }}
            text="Widths"
            x={278}
            y={15}
            textAnchor="middle"
          />
          {this.state.stackColors.map(color => {
            return [
              <VictoryLabel
                style={{
                  fontSize: "3.5px",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "300"
                }}
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
            animate={{
              duration: 500,
              easing: "bounce",
              onload: { duration: 200 }
            }}
            style={{
              data: { width: 6 }
            }}
          >
            {this.renderBar()}

            {/*dataset.map(data => <VictoryBar data={data} />)*/}
          </VictoryStack>
          <VictoryAxis
            style={{
              axis: {
                stroke: "black",
                strokeOpacity: 10
              },
              tickLabels: {
                fontSize: "4px",
                fontFamily: "Lato, sans-serif",
                fillOpacity: 1,
                margin: 3,
                padding: 3
              }
            }}
            tickFormat={this.getSizes().sort((last, next) => last - next)}
          />
        </VictoryChart>
        <PaginationButton
          handlePagination={this.handlePagination}
          clicked={this.state.clicked}
        />
      </React.Fragment>
    );
  }
}
export default StackedBarChart;
