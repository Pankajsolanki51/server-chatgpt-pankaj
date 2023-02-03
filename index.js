import express, { response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())
//configure openai
const configuration = new Configuration({
    organization: "org-jiFz7s15rRtjsCsXlAZUfXRi",
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration)


//listining
app.listen("3080", ()=>console.log("listing on port 3080"))

//dummy rout to test
app.get("/", (req,res)=>{
    res.send("yeah!! THIS IS BACKEND SIDE")
})
 
//post route
app.post('/', async (req, res)=>{
    const{message} = req.body

    try{
         const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 2048,
            temperature: .5,
            
        })

        res.json({message: response.data.choices[0].text})
    }
    catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})

