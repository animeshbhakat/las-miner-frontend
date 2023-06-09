import React from "react";
import Items from "./Items";

const items = [
  {
    id: 0,
    title: "Add land details to blockchain",
    thumbnail: "landAdd.jpeg",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa tempor nec",
  },
  {
    id: 1,
    title: "Transfer Land",
    thumbnail: "landTransfer.cms",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa tempor nec.",
  },
];

function Admin() {
  return (
    <div className={"items-list"}>
      <div className={"items-list--wrapper"}>
        <Items data={items[0]}></Items>

        <Items data={items[1]}></Items>
      </div>
    </div>
  );
}

export default Admin;
