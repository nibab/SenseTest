import { AssetStorageClient } from '../clients/AssetStorageClient'
import { addPost } from '../store/post/actions'
import { useDispatch } from "react-redux"
import { useSelector } from "../store"
import { CreatePostMutation, GetPostQuery } from '../API'
import { Post } from '../types'
import Log from './Log'

export class PostImgDownload {
  callback?: (progress: number) => void
  imagePromise: Promise<Blob>
  completed: boolean
  image?: Blob
  private onDone: (blob: Blob) => void
  
  constructor(imageId: string, onDone: (blob: Blob) => void) {
    this.onDone = onDone
    this.imagePromise = AssetStorageClient.getDownloadUrl(imageId).then((url) => this.download(url))
    this.imagePromise.then((img) => {
      this.completed = true      
      Log.info(`Image download for id ${imageId} completed.`)
    }).catch(() => {
      this.completed = true
    })
    this.completed = false
  }

  download(url: string): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'GET'
      })

      if (response.body !== null) {
        const reader = response.body.getReader();
  
        // Step 2: get total length
        const contentLength = response.headers.get('Content-Length');
  
        if (contentLength === null) {
          reject()
          return
        }
  
        // Step 3: read the data
        let receivedLength = 0; // received that many bytes at the moment
        let chunks = []; // array of received binary chunks (comprises the body)
        
        while(true) {
          const {done, value} = await reader.read();

          if (done) {
              break;
          }

          chunks.push(value);
          receivedLength += value.length;

          const progress = receivedLength/Number(contentLength)
          if (this.callback) {
            //console.log(`id ${this.id} received length ${receivedLength} total ${contentLength} `)
            this.callback(progress)
          }
        }
  
        // Step 4: concatenate chunks into single Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for(let chunk of chunks) {
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
        }

        const blob = new Blob([chunksAll])
        this.onDone(blob)

        resolve(blob)
      }
    }) 
  }

  subscribe(callback: (progress: number) => void) {
    this.callback = callback
  }
}