import { App } from "piyo";

const app = new App();

app.get("/", ctx => {
  ctx.body = "オー";
});

app.listen(4000, () => {
  console.log("Listen on http://localhost:4000");
});
