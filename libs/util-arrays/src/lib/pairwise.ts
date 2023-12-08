export function pairwise(arr: any[]) {
  return arr.reduce<any[][]>( (acc,cur,index) => {
    if(index === 0) {
      acc.push([cur])
    } else if (index % 2 === 1) {
      acc.push([acc.pop()?.[0], cur])
    } else {
      acc.push([cur])
    }

    return acc;
  }, [])
}
