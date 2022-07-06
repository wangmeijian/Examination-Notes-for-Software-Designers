// 主串
let mainString = "BBC ABCDAB ABCDABCDABDEDC";
// 模式串
let patternString = "ABCDABD";

/**
 * 算出《部分匹配表》Partial Match Table
 * 参考文档：http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
 * @method
 * @param  {String} patternString 要计算部分匹配表的模式字符串
 * @return {Array}     计算出的部分匹配表
 */
let getPartialMatchTable = (patternString = "") => {
  if (patternString.length === 0) return [];
  // 模式串为1个字符时，前缀后缀不存在公有元素，因此长度0
  let pmt = [0];
  // 至少2个字符才有计算前缀和后缀的必要
  let startingLength = 2;

  while (startingLength <= patternString.length) {
    let temp = patternString.substring(0, startingLength);
    let length = temp.length;
    // 算出所有前缀
    let prefix = temp
      // 前缀是不包含最后一个字符的
      .substring(0, length - 1)
      .split("")
      .map((_, index) => {
        return temp.substring(0, index + 1);
      });
    // 算出所有后缀
    let suffix = temp
      // 后缀是不包含第一个字符的
      .substring(1)
      .split("")
      .map((_, index) => {
        return temp.substring(index + 1);
      });
    // 前缀和后缀的最长共有元素长度
    let publicLength = 0;
    // 比较前缀后缀得出最长公共字符长度
    prefix.forEach((preitem) => {
      suffix.forEach((sufitem) => {
        if (preitem === sufitem) {
          publicLength =
            preitem.length > publicLength ? preitem.length : publicLength;
        }
      });
    });
    pmt.push(publicLength);
    startingLength++;
  }
  return pmt;
};

let pmt = getPartialMatchTable(patternString);
// 两个索引，从位置0开始匹配
let mainIndex = 0;
let patternIndex = 0;

while (mainIndex < mainString.length && patternIndex < patternString.length) {
  // 匹配上了，继续比较下一个字符
  if (mainString[mainIndex] === patternString[patternIndex]) {
    patternIndex++;
    mainIndex++;
  } else if (patternIndex > 0) {
    // 没匹配上，并且前面已匹配字符数 > 0，模式串索引往后移动 patternIndex - pmt[patternIndex - 1] 位
    patternIndex -= patternIndex - pmt[patternIndex - 1];
  } else {
    // 一个字符都没匹配上
    mainIndex++;
  }
}

if (patternIndex === patternString.length) {
  console.log(
    `mainString包含patternString，索引位置为${mainIndex - patternString.length}至${
      mainIndex - 1
    }`
  );
} else {
  console.log("mainString不包含patternString");
}