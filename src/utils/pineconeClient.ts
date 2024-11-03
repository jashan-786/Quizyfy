import { Pinecone} from '@pinecone-database/pinecone';

const pinecone = new Pinecone();



async function init() {
   new Pinecone({
    apiKey: process.env.PINECONE_API_KEY + ""

   })
}

const indexName = 'quickstart';


export { pinecone, init };
