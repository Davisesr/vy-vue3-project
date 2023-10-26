// JSON格式化
const jsonFormat = (data: any) => {
  let temp = data
  try {
    temp = JSON.stringify(data, null, 2)
  } catch (e) {
    jsonError(e)
  }
  return temp
};

// JSON压缩
const jsonNoFormat = (data: any) => {
  let temp = data
  try {
    temp = JSON.stringify(data)
  } catch (e) {
    jsonError(e)
  }
  return temp
}

// json错误提示
const jsonError = (e: any) => {
  console.log(`JSON字符串错误：${e.message}`);
}

export {
  jsonError,
  jsonFormat,
  jsonNoFormat
}