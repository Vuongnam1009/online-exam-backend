
const toObject =(array)=>{
    let permissions ={}
    const result = [... new Set(array.map(x=>x.method))].map(x=>({"method":x,"uris":[]}));
    array.forEach(x=>result.find(y=>y.method===x.method).uris.push(x.uri));
    result.forEach(data=>{
      let uris ={}
      data.uris.forEach(uri=>{
        uris ={...uris,
          [uri]:1
        }
      })
      permissions={
        ...permissions,
        [data.method]:uris
      }
    })
    return permissions
}

module.exports ={toObject}