const isUrlValidAndHttps = (string: string) => {
  let url: URL
  try {
    url = new URL(string)
  } catch {
    return false
  }

  return url.protocol === "https:"
}

export default isUrlValidAndHttps