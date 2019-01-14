import axios from "axios"

const url = "https://www.reddit.com/r/aww/about"
const getData = async url => {
  try {
    const response = await axios.get(url)
    console.log(response.status)
    const data = response.data
    // console.log(data)
  } catch (error) {
    console.log(error)
  }
}
getData(url)
