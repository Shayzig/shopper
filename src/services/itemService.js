import { storageService } from "./storageService.js";
import { makeId } from "./utilService.js";

export const itemService = {
  query,
  save,
  remove,
  getById,
  getEmptyItem,
};

const STORAGE_KEY = "items";

const gDefaultItems = [
  { _id: "r2", model: "Salad-O-Matic", batteryStatus: 80, type: "Cooking" },
  { _id: "r3", model: "Dusty", batteryStatus: 100, type: "Cleaning" },
  { _id: "r1", model: "Dominique Sote", batteryStatus: 100, type: "Pleasure" },
  { _id: "r4", model: "DevTron", batteryStatus: 40, type: "Office" },
];

var gItems = _loadItems();

function query(filterBy) {
  let itemsToReturn = gItems;
  if (filterBy) {
    var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy;
    maxBatteryStatus = maxBatteryStatus || Infinity;
    minBatteryStatus = minBatteryStatus || 0;
    itemsToReturn = gItems.filter(
      (item) =>
        item.type.toLowerCase().includes(type.toLowerCase()) &&
        item.model.toLowerCase().includes(model.toLowerCase()) &&
        item.batteryStatus < maxBatteryStatus &&
        item.batteryStatus > minBatteryStatus
    );
  }
  return Promise.resolve([...itemsToReturn]);
}

function getById(id) {
  const item = gItems.find((item) => item._id === id);
  return Promise.resolve({ ...item });
}

function remove(id) {
  const idx = gItems.findIndex((item) => item._id === id);
  gItems.splice(idx, 1);
  if (!gItems.length) gItems = gDefaultItems.slice();
  storageService.store(STORAGE_KEY, gItems);
  return Promise.resolve();
}

function save(itemToSave) {
  if (itemToSave._id) {
    const idx = gItems.findIndex((item) => item._id === itemToSave._id);
    gItems.splice(idx, 1, itemToSave);
  } else {
    itemToSave._id = makeId();
    gItems.push(itemToSave);
  }
  storageService.store(STORAGE_KEY, gItems);
  return Promise.resolve(itemToSave);
}

function getEmptyItem() {
  return {
    model: "",
    type: "",
  };
}

function _loadItems() {
  let items = storageService.load(STORAGE_KEY);
  if (!items || !items.length) {
    items = gDefaultItems;
    storageService.store(STORAGE_KEY, items);
  }
  return items;
}
