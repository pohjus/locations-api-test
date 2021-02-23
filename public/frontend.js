const modifyUI = (data) => {
  console.log(data);
  let ul = document.querySelector("ul");
  let ui = data.map(
    (item) => `<li>${item.id} - ${item.latitude} - ${item.longitude}</li>`
  );
  ul.innerHTML = ui.join("\n");
};

const main = async () => {
  let result = await fetch("http://localhost:8080/api/locations");
  let data = await result.json();
  modifyUI(data);
};

main();
