import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import jsonData from "../../ttt.json";
// 2021-04-01T00:00:00  2021-04-02T00:00:00
//2020-12-01T00:00:00  2020-12-31T23:58:00
//2022-05-12T00:00:00 2022-05-26T00:00:00
const parseData = JSON.parse(JSON.stringify(jsonData)); // 중첩구조라 바꿔야 댐
const flightDimensions = parseData.flight.dimensions;
const parkingApronDimensions = parseData.parkingApron.dimensions;
const flightData = parseData.flight.data;
const parkingData = parseData.parkingApron.data;

export default function Gantt() {
    const chartRef = useRef(null);
    const [domain, setDomain] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [options, setOptions] = useState({
        tooltip: {},
        animation: false,
        title: {
            text: "hello",
            left: "center",
        },
        dataZoom: [
            {
                type: "slider",
                yAxisIndex: 0,
                zoomLock: true,
                start: 95,
                end: 100,
                showDetail: false,
            },
            {
                type: "inside",
                id: "insideY",
                yAxisIndex: 0,
                start: 95,
                end: 100,
                zoomOnMouseWheel: false,
                moveOnMouseMove: true,
                moveOnMouseWheel: true,
            },
        ],
        xAxis: {
            onZero: true,
            type: "time",
            position: "top",
            splitLine: {
                lineStyle: {
                    color: ["#E9EDFF"],
                },
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                lineStyle: {
                    color: "#929ABA",
                },
            },
            axisLabel: {
                color: "#929ABA",
                inside: false,
                align: "center",
            },
        },
        yAxis: {
            axisTick: { show: false },
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
            min: 0,
            max: parkingData.length,
        },
        series: [
            {
                id: "flightData",
                type: "custom",
                data: flightData,
                // type
                // interface timeindex {
                //     dimensions: string[],
                //     data: [ index: number, start_time: number|date, end_time: number|date, domain: string, measurement: string ]
                // }
                dimensions: flightDimensions,
                encode: {
                    x: [1, 2],
                    y: [0],
                    tooltip: [0, 1, 2],
                },
                renderItem: (params, api) => {
                    let categoryIndex = api.value(0);
                    let timeArrival = api.coord([api.value(1), categoryIndex]);
                    let timeDeparture = api.coord([api.value(2), categoryIndex]);
                    let coordSys = params.coordSys;
                    let barLength = timeDeparture[0] - timeArrival[0];
                    let barHeight = api.size([0, 1])[1] * 0.6;
                    const x = timeArrival[0]; // x좌표
                    const y = timeArrival[1] - barHeight; // y좌표
                    const flightNumber = api.value(3) + ""; //이름 바에 표시되는 글씨
                    const flightNumberWidth = echarts.format.getTextRect(flightNumber).width; //
                    let text = flightNumber; // 글씨 출력하는 부분

                    let rectNormal = clipRectByRect(params, {
                        // 바
                        x: x,
                        y: y,
                        width: barLength,
                        height: barHeight,
                    });
                    let rectText = clipRectByRect(params, {
                        x: x,
                        y: y,
                        width: barLength,
                        height: barHeight,
                    });

                    // console.log(moment.tz(api.value(1), "Asia/Seoul").format("YYYY-MM-DD hh:mm"));
                    // console.log(new Date(api.value(1)).toString());
                    // console.log(categoryIndex);
                    // console.log(timeArrival);
                    // console.log(timeDeparture);
                    // console.log(coordSys);

                    // 바 && 텍스트 출력
                    return {
                        type: "group",
                        children: [
                            {
                                type: "rect",
                                ignore: !rectNormal,
                                shape: rectNormal,
                                style: api.style(),
                            },

                            {
                                type: "rect",
                                ignore: !rectText,
                                shape: rectText,
                                style: api.style({
                                    fill: "transparent",
                                    stroke: "transparent",
                                    text: text,
                                    textFill: "#fff",
                                }),
                            },
                        ],
                    };
                },
            },
            {
                type: "custom",
                renderItem: (params, api) => {
                    var y = api.coord([0, api.value(0)])[1];
                    if (y < params.coordSys.y + 5) {
                        return;
                    }
                    return {
                        type: "group",
                        position: [0, y],
                        children: [
                            {
                                type: "path",
                                shape: {
                                    d: "M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z",
                                    x: 0,
                                    y: -20,
                                    width: 90,
                                    height: 20,
                                    layout: "cover",
                                },
                                style: {
                                    fill: "#368c6c",
                                },
                            },
                            {
                                type: "text",
                                style: {
                                    x: 24,
                                    y: -3,
                                    text: api.value(1),
                                    textVerticalAlign: "bottom",
                                    textAlign: "center",
                                    textFill: "#fff",
                                },
                            },
                        ],
                    };
                },
                dimensions: parkingApronDimensions,
                encode: {
                    x: -1,
                    y: 0,
                },
                data: parkingData.map(function (item, index) {
                    return [index].concat(item);
                }),
            },
        ],
    });
    function clipRectByRect(params, rect) {
        return echarts.graphic.clipRectByRect(rect, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height,
        });
    }

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            chart.setOption(options);
        }
    }, [options, chartRef]);

    // rect 형태로 출력하는 함수

    return (
        <>
            <div
                ref={chartRef}
                style={{
                    width: "1000px",
                    height: "500px",
                }}
            />
            <button onClick={() => loadData()}>sumit</button>
        </>
    );
}
