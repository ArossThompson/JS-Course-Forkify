import axios from 'axios';
import { key, proxy }from '../config';
import { recipes } from './dummy-data/recipes'

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);

      // Comment the line below and use this.result = recipes if free API call limit is reached. 
      this.result = res.data.recipes;
      
      // Below can be used to make the app if the limit has been hit. 
      // this.result = recipes;

    } catch (error) {
      alert(error)
    }
  }
}
