export const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2); //去基准点
  var pivot = arr.splice(pivotIndex, 1)[0]; //取基准值
  var left = []; //放小于基准点的值
  var right = []; //放大于基准点的值
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i] < pivot) left.push(arr[i])
    else right.push(arr[i])
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
