import { AssetStorageClient } from '../clients/AssetStorageClient'

export class ImgDownloadInProgress {
  callback?: (progress: number) => void
  image: Promise<Blob>
  completed: boolean
  id: string
  
  constructor(id: string) {
    this.id = id
    this.image = AssetStorageClient.getDownloadUrl(id).then((url) => this.download(url))
    this.image.then(() => this.completed = true).catch(() => this.completed = true)
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
  
        resolve(new Blob([chunksAll]))
      }
    }) 
  }

  subscribe(callback: (progress: number) => void) {
    this.callback = callback
  }
}