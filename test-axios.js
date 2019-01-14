// const axios = require("axios");
import axios from "axios"
const url = "http://www.omdbapi.com/?s=california&apikey=thewdb"
const getData = async url => {
  try {
    const response = await axios.get(url)
    const data = response.data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
getData(url)
