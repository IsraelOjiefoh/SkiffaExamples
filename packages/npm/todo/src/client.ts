import * as api from "todo-api";

main();

// entrypoint for the client
function main() {
  // Add event listener for sub events
  window.addEventListener("submit", async (event) => {
    // prevent the submit from navigating
    event.preventDefault();

    // set a busy class to indicate that we are doing something
    window.document.body.className = "busy";
    try {
      const form = event.target as HTMLFormElement;
      // assume our form has one element that is an input
      const input = form.elements.item(0) as HTMLInputElement;
      const inputValue = input.value.trim();

      if (inputValue.length === 0) {
        return;
      }

      // call the api
      const resultValue = await api.client.addTodoItem(
        { description: input.value },
        {
          baseUrl: new URL("/", window.document.location.href),
        },
      );

      // find the result div, assume it's there
      const resultDiv = document.getElementById("result")!;

      // create and fill a div for out result
      const itemDiv = document.createElement("div");
      itemDiv.innerText = input.value;

      // add it to the result dic
      resultDiv.prepend(itemDiv);

      // reset the form
      form.reset();
    } finally {
      // unset busy class, we are done
      window.document.body.className = "";
    }
  });
}
