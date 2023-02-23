export const copyObject = (object: any) => {
  return JSON.parse(JSON.stringify(object))
}

export const compareObject = (object1: any, object2: any) => {
  return JSON.stringify(object1) === JSON.stringify(object2)
}

export function stripTags(string: string) {
  return string.replace(/<\/?[^>]+>/ig, " "); 
}