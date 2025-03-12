import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();

const randomnumber : number[] = [];
app.get("/genarate", (c) => {
    const random=Math.floor(Math.random()*100);
    randomnumber.push(random);  
    return c.json({random}, 200); 
       
});

const time = new Date();
app.get("/time", (c) => {
    return c.json({time}, 200); 
}
);
const environment:string[]= [];
app.get("/environment", (c) => {   
    const platform = process.platform; 
    const environment=process.version
    return c.json({environment,platform}, 200); 
}
);
const puppit :string[] = [];
app.get("/puppit", (c) => {
    const name=c.req.query();
    return c.json(`puppit:hello ${name}`, 200);

}); 
 const randomNumber : number[] = [];
app.post("/storenumber", async(c) => {
    const body=await c.req.json();
    const number = body.number;   
    randomNumber.push(number);
    return c.json({number}, 200); 
}
); 
 app.post("/getnumber", async(c) => {
    const body=await c.req.json();
    const number = body.number;
    return c.json({number}, 200);
}
);   

const randomNum: number[] = [];

app.post("/storenumber", async (c) => {
  const body = await c.req.json();
  const number = body.number;

  if (typeof number !== "number") {
    return c.json({ error: "Invalid number" }, 400);
  }

  randomNumber.push(number);
  
  return c.json({ lastEnteredNumber: number });
});

app.get("/storenumber", (c) => {
  return c.json({ allNumbers: randomNumber });
});

serve(app);
console.log(`Server is running at http://localhost:${3000}`);