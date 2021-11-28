export const addNewToDoInList = (id, text) => {
  let x = new Promise(async (resolve, reject) => {
    const result = await fetch(`${process.env.REACT_APP_BASE_URL}addNewToDo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id, text: text }),
    }).then((response) => resolve(response.json()));
  });
  return x.then((data) => data).catch((err) => err);
};
