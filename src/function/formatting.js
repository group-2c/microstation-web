
/**
 * 根据name字段取数结构上层数据
 * @param {*} list 
 * @param {*} name 
 * @returns 
 */
const getThreeNameParents = (list, name) => {
  for (let i in list) {
    if(list[i].name == name) {
      return [list[i]]
    }
    if(list[i].children) {
      let node = getThreeNameParents(list[i].children, name)
      if(node !== undefined) {
        return node.concat(list[i])
      }
    }
  }        
}

export {
  getThreeNameParents,
}