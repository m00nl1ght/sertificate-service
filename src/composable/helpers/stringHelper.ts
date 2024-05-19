function getUrlFromString(str: string): string[] | null {
  // const links = str.match(/http:\/\/[^\s\Z]+/i)
  const links = str.match(/(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/gim)

  return links
}

function createHref(str: string) {
  return `<a href="${str}" target="_blank" rel="noopener noreferrer">${str}</a>`
}

export { getUrlFromString, createHref }
