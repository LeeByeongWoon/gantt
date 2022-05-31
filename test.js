var data = [];
var dataCount = 10;
var startTime = +new Date();
var categories = ["categoryA", "categoryB", "categoryC"];
var types = [
    { name: "JS Heap", color: "#7b9ce1" },
    { name: "Documents", color: "#bd6d6c" },
    { name: "Nodes", color: "#75d874" },
    { name: "Listeners", color: "#e0bc78" },
    { name: "GPU Memory", color: "#dc77dc" },
    { name: "GPU", color: "#72b362" },
];
// Generate mock data
categories.forEach(function (category, index) {
    var baseTime = startTime;
    for (var i = 0; i < dataCount; i++) {
        var typeItem = types[Math.round(Math.random() * (types.length - 1))];
        var duration = Math.round(Math.random() * 10000);
        data.push({
            name: typeItem.name,
            value: [index, baseTime, (baseTime += duration), duration],
            itemStyle: {
                normal: {
                    color: typeItem.color,
                },
            },
        });
        baseTime += Math.round(Math.random() * 2000);
    }
});
const term = new Date("2022-05-16T23:00:00") - new Date("2022-05-02T01:00:00");
console.log(new Date("2022-05-16T23:00:00").getTime());
console.log(new Date("2022-05-02T01:00:00").getTime());
console.log(term);
const arr = [new Date("2022-05-16T23:00:00"), new Date("2022-05-02T01:00:00")];
console.log(arr);
console.log(arr.sort((start, end) => start - end));
console.log(arr.sort((start, end) => end - start));
// new Date("2021-04-01T00:00:00").getTime(),
// new Date("2020-12-01T00:00:00").getTime(),
// new Date("2022-05-12T00:00:00").getTime(),
console.log(
    new Date(
        Math.min(
            new Date(2021, 04, 01, 00, 00, 00).getTime(),
            new Date(2020, 12, 01, 00, 00, 00).getTime(),
            new Date(2022, 05, 12, 00, 00, 00).getTime(),
        ),
    )
        .toISOString()
        .replace("T", " ")
        .replace(/\..*/, ""),
);
console.log(new Date(Date.parse("2020-12-01T00:00:00")).toISOString());
function convertFromStringToDate(responseDate) {
    let dateComponents = responseDate.split("T");
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return new Date(datePieces[2], datePieces[1] - 1, datePieces[0], timePieces[0], timePieces[1], timePieces[2]);
}
convertFromStringToDate("2020-12-01T00:00:00");
// console.log(categories);
// console.log(data);
// console.log(new Date().getTime());
// console.log(new Date());
// console.log(Math.round(Math.random() * 10000));

// "time_range": {
//     "start_time": "2020-12-01T00:00:00",
//     "end_time": "2020-12-31T23:58:00"
//   }
// }
