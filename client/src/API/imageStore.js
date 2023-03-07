import { getStorage, ref } from "firebase/storage";

const storage = getStorage();

const imagesRef = ref(storage, 'images');

console.log(imagesRef);