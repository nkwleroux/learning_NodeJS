const EventEmitter = require("events");

const customEmitter = new EventEmitter();

// on = listen to events
customEmitter.on("response", () => {
  console.log("data recieved");
});

customEmitter.on("response", (name,id) => {
    console.log(`data recieved ${name} with age ${id}`);
  });

//prints whatever in on. Fires after on is called
customEmitter.emit("response",'john',34);
