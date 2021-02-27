---
title: Exploring sorting algorithms with JavaScript
date: "2021-02-27T22:40:32.169Z"
template: "post"
draft: false
slug: "/exploring-sorting-algorithms-with-javascript/"
category: "JavaScript"
tags:
  - "Algorithms"
  - "JavaScript"
description: "In this article, we will consider 6 sorting algorithms and how they can be implemented in JavaScript."
socialImage: "/media/exploring-sorting-algorithms-with-javascript.png"
---

![Sorting Algorithms](/media/exploring-sorting-algorithms-with-javascript.png)

Sorting is the process of rearranging and grouping in an ordered sequence, a list of items of the same type. Apart from the fact that it usually comes up in most technical interviews, sorting is a commonly used operation in many applications, and most languages even have its native implementation.

Sorting is considered by many to be the most fundamental problem in the study of algorithms and a good number of efficient techniques have been developed to perform this operation.

Examples of sorting operations are arranging numbers from the largest to smallest, sorting names alphabetically, and arranging movies based on release year or revenue.

In this article, we will consider 6 sorting algorithms and how they can be implemented in JavaScript.

## Bubble sort

In bubble sort(also known as sinking sort), we start from the beginning of the array by swapping two consecutive elements if the first one is larger than the second. This process is repeated till the end of the array, making the largest values bubble to the top or end of the array.

Below is a function that sorts an array of numbers with bubble sort.

```js
const bubbleSort(arr) => {
	let noSwaps;
	for(let i = arr.length; i > 0; i--) {
		noSwaps = true;
		for(let j = 0; j < i - 1; j++) {
			if(arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				noSwaps = false;
			}
		}
		if(noSwaps) break;
	}
	return arr;
}
```

The idea is to loop through the array and check for larger elements in the nested loop to bubble to the top. Unnecessary checks can be avoided by ensuring that sorted and out of bound elements are not compared. A complete cycle without any swap indicates that every element is in order and the sorted array is returned afterward.

The time complexity of bubble sort on the average and worst case is O(_n<sup>2</sup>_). The best-case runtime of O(_n_) is achieved when all the elements are already sorted.

## Selection sort

Selection sort is a simple but slow algorithm. It is performed by carrying out a linear scan to find the minimum element and swapping it with the element at the least unsorted index, this process is repeated until all the elements are in place. This way, the left part of the array is always sorted.

Below is a function that sorts an array of numbers with selection sort.

```js
const selectionSort(arr) => {
	for(let i = 0; i < arr.length; i++) {
		let lowest = i;
		for(let j = i + 1; j < arr.length; j++) {
			if(arr[lowest] > arr[j]) {
				lowest = j;
			}
		}
		if(i !== lowest) {
			let temp = arr[i];
			arr[i] = arr[lowest];
			arr[lowest] = temp;
		}
	}
	return arr;
}
```

Selection sort can prove to be a very inefficient algorithm in scenarios where the number of elements of the array is very large. This is because we almost have to compare each element with every other element, hence the runtime being O(_n<sup>2</sup>_) in both the average and worst case. However, it could be more efficient than bubble sort in situations where we need to make just very few swaps.

## Insertion sort

In insertion sort, the sorted array is built up by gradually creating a portion of the array which is always sorted. So instead of finding the least or largest element, it just takes each element and places it where it should go in the sorted part of the array.

```js
const insertionSort = (arr) => {
	const currentVal;
	for (const i = 1; i < arr.length; i++) {
		currentVal = arr[i];
		for (const j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = currentVal;
	}
	return arr;
};
```

With insertion sort, the left part of the array is always sorted. This makes it a very good algorithm to use when sorting a list that has its elements increasing in number or coming in realtime from a source. Although other algorithms like quicksort and merge sort can be much faster than insertion sort when dealing with large lists; it still has other advantages like being very efficient for small data sets, having a best-case runtime of O(_n_), and always using constant space.

## Merge sort

Merge sort is a quite efficient algorithm that takes the approach of divide-and-conquer which involves breaking a problem down into smaller versions of the same problem and bringing the answer together once the solutions of the sub-problems have been evaluated.

Now back to merge sort: The idea behind this algorithm is that once an element consists of either one or zero elements, it's already sorted but if there are more elements, it will be split into two, sorted, and then merged together.

Here is the code for merge sort:

```js
const mergeSort = (arr1, arr2) => {
	let results = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr2[j] > arr1[i]) {
			results.push(arr1[i]);
			i++;
		} else {
			results.push(arr2[j]);
			j++;
		}
	}
	while (i < arr1.length) {
		results.push(arr1[i]);
		i++;
	}
	while (j < arr2.length) {
		results.push(arr2[j]);
		j++;
	}
	return results;
};
```

The average and worst-case runtime of merge sort is O(_n_ log*n*). This is because a runtime of 0(_n_) is required to merge the different sub-arrays formed by diving the original array of `*n*` elements. And this division into half in every step is logarithmic or O(log _n_) thus resulting in a total runtime of O(_n_ log*n*). The space complexity is O(n) since a total number of `n` elements will form the new arrays.

## Quick sort

Like merge sort, quick sort also exploits the fact that arrays of length 0 or 1 are already sorted. It works by selecting a random _pivot_ element in the array and finding the index where that element should end up in the sorted array. Once that index is found, the process is repeated recursively on the left and right sides of the other elements in the array.

Below is an implementation of quick sort:

```js
const quickSort = (arr, left = 0, right = arr.length - 1) => {
	const pivot = (arr, start = 0, end = arr.length - 1) => {
		const swap = (arr, idx1, idx2) => {
			[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
		};

		let pivot = arr[start];
		let swapIdx = start;

		for (let i = start + 1; i <= end; i++) {
			if (pivot > arr[i]) {
				swapIdx++;
				swap(arr, swapIdx, i);
			}
		}

		swap(arr, start, swapIdx);
		return swapIdx;
	};
	if (left < right) {
		let pivotIndex = pivot(arr, left, right);

		quickSort(arr, left, pivotIndex - 1);

		quickSort(arr, pivotIndex + 1, right);
	}
	return arr;
};
```

Just like merge sort, the average runtime of quicksort is O(_n_ log*n*). But it has a worst-case runtime of O(n<sup>2</sup>). This happens when the partitions are as unbalanced as they can be. The space complexity on the other hand is O(log*n*).

## Radix(Bucket) sort

It has been proven that on the average case, _comparison_ algorithms cannot be any better than O(_n_ log*n*). But that leaves us with the question of how to come up with a better algorithm.

Unlike other _comparison_ algorithms, Radix sort is a _special_ sorting algorithm for integers that takes advantage of the fact that integers have a finite number of bits and that integers with larger digits are always greater than those with fewer digits.
In radix sort, we iterate through each of the digits of the integer and group them into _buckets_ together with other elements with the same number from the same position, starting from the right-hand side/end of the integers.

I know that sounds like a lot 😳, below is an implementation:

```js
function radixSort(nums) {
	function getDigit(num, i) {
		return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
	}

	function digitCount(num) {
		if (num === 0) return 1;
		return Math.floor(Math.log10(Math.abs(num))) + 1;
	}
	const mostDigits = (nums) => {
		let maxDigits = 0;
		for (let i = 0; i < nums.length; i++) {
			maxDigits = Math.max(maxDigits, digitCount(nums[i]));
		}
		return maxDigits;
	};

	let maxDigitCount = mostDigits(nums);
	for (let k = 0; k < maxDigitCount; k++) {
		let digitBuckets = Array.from({ length: 10 }, () => []);
		for (let i = 0; i < nums.length; i++) {
			let digit = getDigit(nums[i], k);
			digitBuckets[digit].push(nums[i]);
		}
		nums = [].concat(...digitBuckets);
	}
	return nums;
}
```

The idea is to first find out the length _k_ of the largest integer in the list. Then looping _k_ times, _buckets_(0 - 9) are created where each integer in the list will be placed based on the number in its *k*th digits. The list is then reordered with the numbers in each bucket starting from 0 - 9 and returned afterward.

The runtime for radix sort is O(_kn_) where _k_ is the number of elements and _n_ is the number of passes of the sorting algorithm or the length of the largest number in the list.

## Conclusion

In this article, we explored 6 different sorting algorithms, how they work and how to implement them using JavaScript. As we have seen, some of these algorithms are more efficient than others given certain constraints.

Merge sort and quick sort proved to be more efficient than bubble, selection, and insertion sort especially when dealing with very large data sets. This is because of their use of divide-and-conquer. Merge sort basically divides and then sorts the resultant partitions by merging them while quick sort works in-place by recursively placing each element in their right position in the array.

Radix sort on the other hand exploits an interesting quirk in a list of integers and can be very fast especially when the largest integer isn't _very large_.

Thanks for reading!
