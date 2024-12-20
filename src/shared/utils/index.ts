
export const applyDrag = (arr, dragResult) => {

    console.log("TESTE1")
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
  
    const result = [...arr]
    let itemToAdd = payload
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }
  
    return result
  }
  
export const generateItems = (count, creator) => {
    console.log("TESTE2")
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
}