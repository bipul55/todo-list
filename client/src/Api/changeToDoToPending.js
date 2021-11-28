export const changeToDoToPending = (list_id, toDo_id) => {
  let x = new Promise(async (resolve, reject) => {
    const result = await fetch(
      `${process.env.REACT_APP_BASE_URL}changeToDoToPending`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ list_id: list_id, toDo_id: toDo_id }),
      }
    ).then((response) => resolve(response.json()));
  });
  return x.then((data) => data).catch((err) => err);
};
