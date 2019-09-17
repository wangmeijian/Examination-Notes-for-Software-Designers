// 主串
let str1 = 'BBC ABCDAB ABCDABCDABDEDC';
// 模式串
let str2 = 'ABCDABD';

/**
 * 算出《部分匹配表》Partial Match Table
 * 参考文档：http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
 * @method
 * @param  {String} str 要计算的字符串
 * @return {Array}     部分匹配表
 */
let getPMT = (str = '') => {
	if(str.length === 0)return [];
	let pmt = [0];
	let k = 2;
	while(k <= str.length){
		let temp = str.substring(0, k);
		let length = temp.length;
		// 前缀
		let prefix = temp.substring(0, length - 1).split('').map((item, index) => {
			return temp.substring(0, index + 1);
		});
		// 后缀
		let suffix = temp.substring(1).split('').map((item, index) => {
			return temp.substring(index + 1);
		});
		let publicLength = 0;
		// 比较前缀后缀得出最长公共字符长度
		prefix.forEach(preitem => {
			suffix.forEach(sufitem => {
				if(preitem === sufitem){
					publicLength = preitem.length > publicLength ? preitem.length : publicLength;
				}
			})	
		})
		pmt.push(publicLength);
		k++;
	}
	return pmt;
}

let pmt = getPMT(str2);
let m = 0;
let n = 0;

while(m < str1.length && n < str2.length){
	if(str1[m] === str2[n]){ // 匹配时，继续比较下一个字符
		n++;
		m++;
	}else if(n > 0){ // 当前不匹配时，如果前面已匹配字符数 > 0，模式串索引往前移动pmt[n - 1]位
		n = pmt[n - 1];
	}else{
		m++;
	}
}
if(n === str2.length){
	console.log(`str1包含str2，索引位置为${m - str2.length}至${m - 1}`);
}else{
	console.log('str1不包含str2');
}




