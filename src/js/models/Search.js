import axios from 'axios';
import { recipes } from './dummy-data/recipes'

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    const key = 'be731de20d7caa191cb63b38f9f66a85'
    
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      // this.result = res.data.recipes; commented because of API call daily limit

      // Below can be used to make the app if the limit has been hit. 
      this.result = recipes;

    } catch (error) {
      alert(error)
    }
  }
}
