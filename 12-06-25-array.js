const products = [
    { id: 1, name: "Laptop", price: 45000, active: true },
    { id: 2, name: "Keyboard", price: 1500, active: false },
    { id: 3, name: "Mouse", price: 800, active: true },
    { id: 4, name: "Monitor", price: 12000, active: true },
    { id: 5, name: "Printer", price: 8500, active: false },
];
const categories = ["Electronics", "Accessories", "Accessories", "Electronics", "Office"];
const getActiveProductNameInString = () => {
    const string = products.filter(val => val.active).map(val => val.name).join();
    return string;
}
// console.log(getActiveProductNameInString())

const addCatagoties = () => {
    const newProducts = products.map((val, i) => {
        return { ...val, category: categories[i] }
    });
    return newProducts;
}

//console.log(addCatagoties())

const getProducsStatusLisr = () => {
    const productsActivete = products.filter(val => val.active);
    const productsInActivete = products.filter(val => !val.active);
    return { activet: [...productsActivete], inActivate: [...productsInActivete] }
}
// console.log(getProducsStatusLisr())

const getMinMaxAvgPrice = () => {
    const arr = products.map(val => val.price);

    return {
        maxPrice: Math.max(...arr), minPrice: Math.min(...arr), avaragePrice: arr.reduce((previousValue, currentValue) => {

            return previousValue + currentValue;
        }, 0) / arr.length
    };
}
// console.log(getMinMaxAvgPrice())

const getAvrageAbovePriceProduct = () => {
    const sum = products.map(val => val.price).reduce((sum, val) => sum + val, 0);
    const prs = products.filter(val => val.price >= Math.round(sum / products.length));
    return prs.map(val => val.name);
}
// console.log(getAvrageAbovePriceProduct())

const give10PERDisccount = () => {
    const list = products.map(val => {
        return {
            name: val.name,
            originalPrice: val.price,
            discountPrice: val.price - Math.round((val.price * 10) / 100)
        };
    });
    return list;
}

// console.log(give10PERDisccount())
//1
const getLongetsPRName = () => {
    const largestList = products.map(val => val.name);
    let largestName = '';
    for (let i = 0; i < largestList.length; i++) {
        if (largestList[i].toLowerCase().localeCompare(largestName.toLowerCase()) > 0) {
            console.log(largestList[i], largestName)
            largestName = largestList[i];
        }
    }
    return largestName;
}
//2
const getLongetsPRName2 = () => {
    const name = products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))[0].name;
    return {
        name: name,
        length: name.length
    }
}
console.log(getLongetsPRName2())