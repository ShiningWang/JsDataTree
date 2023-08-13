import './App.css';

const NestedTree = [
  {
    "uid": "97bec839-fe29-4071-b9a2-af22f13b4609",
    "parent_uid": null,
    "name": "ItemOne"
  },
  {
    "uid": "c0df31e4-95f9-4436-b305-54110e1b2c5e",
    "parent_uid": "97bec839-fe29-4071-b9a2-af22f13b4609",
    "name": "ItemTwo"
  },
  {
    "uid": "03496125-7c3d-4bb1-9067-4a28705aee19",
    "parent_uid": "97bec839-fe29-4071-b9a2-af22f13b4609",
    "name": "ItemThree"
  },
  {
    "uid": "0a7c2b26-01e6-4647-8e3d-2c5fdd40564a",
    "parent_uid": "03496125-7c3d-4bb1-9067-4a28705aee19",
    "name": "ItemFour"
  },
  {
    "uid": "c82f6e8f-ae1f-42c1-bc1e-092943382894",
    "parent_uid": null,
    "name": "ItemFive"
  },
  {
    "uid": "69639529-01f2-4bdc-bb1c-33c405f9bcc8",
    "parent_uid": "c82f6e8f-ae1f-42c1-bc1e-092943382894",
    "name": "ItemSix"
  }
];

function App() {
  FlattingTree();

  NestingTree();

  return (
    <div className="App">
    </div>
  );
}

function FlattingTree() {

}

function NestingTree() {
  let ChildrenItems = [];
  let RootItems = NestedTree.reduce((PendingRootItems, CurrentItem) => {
    if (CurrentItem.parent_uid === null) {
      return [...PendingRootItems, CurrentItem];
    } else {
      ChildrenItems.push(CurrentItem);
      return PendingRootItems;
    };
  }, []);

  let CompletedItems = [];
  RootItems.forEach(RootItem => {
    let ItemWithChildren = CollectChildren(RootItem, ChildrenItems);
    CompletedItems.push(ItemWithChildren);
  });

  console.log(CompletedItems);
}

function CollectChildren(CurrentItem, PendingItems) {
  let CurrentItemChildren = [];
  let PendingNextLayerChildren = [];

  PendingItems.forEach(PendingItem => {
    if (PendingItem.parent_uid === CurrentItem.uid) {
      CurrentItemChildren.push(PendingItem);
    } else {
      PendingNextLayerChildren.push(PendingItem);
    };
  });

  if (CurrentItemChildren.length === 0) {
    return {
      ...CurrentItem,
      "children": []
    };
  } else {
    return {
      ...CurrentItem,
      "children": CurrentItemChildren.reduce((CollectedChildren, CurrentItemChild) => {
        return [
          ...CollectedChildren,
          CollectChildren(CurrentItemChild, PendingNextLayerChildren)
        ];
      }, [])
    };
  };
}

export default App;
