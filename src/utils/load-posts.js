export const loadPosts = async () => {
  const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postResponse, photoResponse]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url, id: index };
  });

  return postAndPhotos;
};
