/**
 * 各种排序，原理参考第三章：数据结构中排序相关内容
 */
let arr = [45, 2, 6, 1, 98, 336, 59];



// 基数排序
let sort = arr => {
	let tArr = {};

	/**
	 * 获取数字指定位数
	 * @param  {[Number]} number 数字
	 * @param  {[Number]} digit  位数，个位1，十位10，百位100，以此类推
	 * @return {[Number]} 返回指定的位数数字
	 */
	let getNumber = (number, digit) => {
		return parseInt(number % (10 * digit) / digit);
	}

	// 循环比较次数根据最大值位数而定
	for (let i = 0; i < (Math.max(...arr) + '').length; i++) {
		tArr = {};
		// 依次比较个位、十位、百位，位数值相等的元素放到对应的二维数组里
		for (let j = 0; j < arr.length; j++) {
			let key = getNumber( arr[j], Math.pow(10, i) );
			if (!tArr[key]) {
				tArr[key] = [arr[j]];
			} else {
				tArr[key].push(arr[j]);
			}
		}

		arr = [];
		// 将二维数组转换为一维数组
		for(let index in tArr){
			for (let i = 0; i < tArr[index].length; i++) {
				arr.push(tArr[index][i]);
			}
		}
	}

	return arr;
}


// 插入排序
let insert = arr => {
	let index = 1;
	// 默认取第一个元素放到有序数组newArr
	let newArr = [ arr[0] ];
	// 从第二个元素开始，从后往前与有序数组的每个元素比较，大则放后面，小则继续与前一个元素比较知道全部比较完成
	let insertToArr = (element, arr, index) => {
		if(index < 0){
			newArr.unshift(element);
			return;
		}
		if(element >= arr[index]){
			newArr.splice(index + 1, 0, element);
		}else{
			index--;
			insertToArr(element, arr, index);
		}
	}

	while(index < arr.length){
		insertToArr(arr[index], newArr, newArr.length - 1);
		index++;
	}
	return newArr;
}


// 希尔排序
