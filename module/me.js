// 声明函数
function tiemo() {
    console.log('timemo')
}

function niejiao() {
    console.log('niejiao');
}

// 暴露数据
// module.exports = tiemo;
// 暴露数据2
module.exports = {
    tiemo,
    niejiao
}
// 暴露数据3
// exports.niejiao = niejiao;
// exports.tiemo = tiemo;


// 注意：不能使用 exports=value的形式暴露数据
// 因为如下相等
// exports = module.exports = {tiemo: tiemo}
// exports.tiemo = tiemo;
