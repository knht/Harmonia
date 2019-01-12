import axios, { AxiosResponse, AxiosAdapter } from 'axios'
import Bottleneck from 'bottleneck'
import { Options } from '../structures/interfaces/RequestOptions'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';


export class Request {
  
  public axiosHandler: any;
  public rateLimiter: any;
  constructor() {
    this.rateLimiter = new Bottleneck({
      reservoir: 1200, 
      reservoirRefreshAmount: 100,
      reservoirRefreshInterval: 60 * 1000
    });
    this.axiosHandler = this.createInstance();
  }

  createInstance () {
    return axios.create({
      baseURL: 'https://osu.ppy.sh/api',
      headers: {
        'Cache-Control': 'no-cache',
        'User-Agent': `Harmonia v${require('../../package.json').version} (https://github.com/Kotowaru/Harmonia)`
      },
      adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, { cacheFlag: 'useCache'}))
    })
  }

  http (url: String, options: Options) {
    return new Promise((resolve, reject) => {
      if(!options.k) return reject(new Error("You need to set your api key to use this."))
      this.rateLimiter.schedule(() => this.axiosHandler.get(url, { params: options })).then((response: AxiosResponse) => {
        if(response.status !== parseInt('200')) {
          return reject(new Error(`Failed to send request: ${response.statusText}`))
        }
        resolve(response.data)
      }).catch(reject)
    })
  }
}