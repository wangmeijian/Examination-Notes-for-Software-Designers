let str1 = 'BBC ABCDAB ABCDABCDABDE';
let str2 = 'ABCDABD';

/**
 * 算出《部分匹配表》Partial Match Table
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
		let prefix = temp.substring(0, length - 1).split('').map((item, index) => {
			return temp.substring(0, index + 1);
		});
		let suffix = temp.substring(1).split('').map((item, index) => {
			return temp.substring(index + 1);
		});
		let publicLength = 0;

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
	console.log(pmt);
	return pmt;
}

let pmt = getPMT(str2);
let m = 0;
let n = 0;

while(m < str1.length){
	if(str1[m] === str2[n]){
		n++;
	}else{
		n -= (n - 1)
	}
	m++;
}

