function selectionSort(array = []) {
    for (let i = 0; i < array.length; i++) {
        let swapped = false
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                [array[i], array[j]] = [array[j], array[i]]
                swapped = true
            }
        }
        if (!swapped) {
            break;
        }
        console.log("step - ", i + 1, array)
    }
    return array;
}
console.log("Try Selection Sort", selectionSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));


function bubbleSort(array = []) {
    for (let i = 0; i < array.length; i++) {
        let swapped = false
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
                swapped = true
            }
        }
        if (!swapped) {
            break;
        }
    }
    return array;
}

console.log("Try Bubble Sort", bubbleSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));

function quickSort(array = []) {
    if (array.length <= 1) return array;
    let left = [];
    let right = [];
    let pivot = array[array.length - 1];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            left[left.length] = array[i];
        } else {
            right[right.length] = array[i]
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}
console.log("Try Quick Sort", quickSort([1, 2, 3, 4, 5, 9, 8, 7, 6, 0]));