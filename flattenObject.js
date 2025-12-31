const input = { 

  name: "TechCorp", 

  location: { 

    country: "USA", 

    city: "New York", 

    address: { 

      street: "5th Avenue", 

      number: 101 

    } 

  }, 

  employees: [ 

    { name: "Alice", role: "Developer" }, 

    { name: "Bob", role: "Designer" } 

  ] 

}; 

function flatInnerObjects(input, output = {}, pk = ''){
    for(let key in input){
        const newKey = `${pk ? pk+'.' : ''}${key}`;
        if(typeof input[key] == 'object'){
            flatInnerObjects(input[key], output, newKey)
        }else{
            output[newKey] = input[key]
        }
    }
    return output
}
//expected output 
console.log(flatInnerObjects(input))
