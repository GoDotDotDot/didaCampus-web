import pathToRegexp from 'path-to-regexp'
const reg = pathToRegexp('/index/:id')

const getParams = (pathname)=>{
    const params = reg.exec(pathname)
    let id
    if(params){
        if(params.length>1){
          id = params[1]
        }else{
          id='all'
        }
    }else{
      id = 'all'
    }
    return id
  }

  export {getParams}